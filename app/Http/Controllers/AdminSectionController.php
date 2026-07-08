<?php

namespace App\Http\Controllers;

use App\Models\AboutSection;
use App\Models\Banom;
use App\Models\categori;
use App\Models\chooseUs;
use App\Models\CtaSection;
use App\Models\footer;
use App\Models\Galery;
use App\Models\GalleryImage;
use App\Models\HeroSection;
use App\Models\ImageService;
use App\Models\ListPaket;
use App\Models\partner;
use App\Models\PriceService;
use App\Models\project;
use App\Models\ServiceSection;
use App\Models\statistik;
use App\Models\testimoni;
use App\Models\workflow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

class AdminSectionController extends Controller
{
    public function update(Request $request, string $section)
    {
        return match ($section) {
            'heroData' => $this->saveHero($request),
            'aboutData' => $this->saveAbout($request),
            'servicesData' => $this->saveServices($request),
            'portfolioData' => $this->savePortfolio($request),
            'whyChooseUs' => $this->saveWhyChooseUs($request),
            'statisticsData' => $this->saveStatistics($request),
            'partner' => $this->savePartners($request),
            'testimoni' => $this->saveTestimonials($request),
            'galery' => $this->saveGallery($request),
            'workflow' => $this->saveWorkflow($request),
            'ctaData' => $this->saveCta($request),
            'footer' => $this->saveFooter($request),
            'priceData' => $this->savePrice($request),
            default => abort(404, "Unknown section: $section"),
        };
    }

    protected function saveHero(Request $request): mixed
    {
        $data = $request->all();
        $item = $data['items'][0] ?? [];
        $gradient = $data['gradient'] ?? [];

        HeroSection::updateOrCreate(
            ['id' => 1],
            [
                'badge' => $item['badge'] ?? null,
                'title' => $item['title'] ?? null,
                'titleHighlight' => $item['titleHighlight'] ?? null,
                'subtitle' => $item['subtitle'] ?? null,
                'from_color' => $gradient['from'] ?? null,
                'via_color' => $gradient['via'] ?? null,
                'to_color' => $gradient['to'] ?? null,

                // UBAH DI SINI: ambil dari 'deg' dan tambahkan string 'deg' jika ada nilainya
                'deg_color' => isset($gradient['deg']) ? $gradient['deg'] . 'deg' : null,

                'showScrollIndicator' => $item['showScrollIndicator'] ?? true,
            ]
        );

        return back();
    }

    protected function saveAbout(Request $request): mixed
    {
        // Ambil data items dari request array
        $items = $request->input('items', []);
        $itemData = $items[0] ?? [];

        // Ambil data gambar lama dari database sebagai cadangan jika tidak ada update
        $currentData = AboutSection::find(1);
        $imagePath = $currentData ? $currentData->image : null;

        // 1. DETEKSI: Cek apakah ada file biner baru yang diunggah
        if ($request->hasFile('items.0.image')) {

            $file = $request->file('items.0.image');

            // Validasi ekstensi dan ukuran gambar (opsional namun direkomendasikan)
            if ($file->isValid()) {
                // Generate nama file unik baru
                $fileName = 'about_' . time() . '_' . Str::random(5) . '.' . $file->getClientOriginalExtension();

                // Simpan file fisik ke folder storage/app/public/about
                $file->storeAs('about', $fileName, 'public');

                // Hapus gambar lama dari server agar kapasitas storage terjaga
                if ($currentData && $currentData->image) {
                    Storage::disk('public')->delete($currentData->image);
                }

                // Path yang akan disimpan ke database
                $imagePath = 'about/' . $fileName;
            }
        } else {
            // 2. JIKA TIDAK ADA FILE BARU: Pertahankan file lama, bersihkan string url yang berasal dari React
            $oldImageString = $itemData['image'] ?? '';

            if (! empty($oldImageString)) {
                // Hilangkan prefix domain atau /storage/ jika terbawa dari front-end
                if (Str::startsWith($oldImageString, '/storage/')) {
                    $imagePath = Str::replaceFirst('/storage/', '', $oldImageString);
                } elseif (Str::startsWith($oldImageString, 'storage/')) {
                    $imagePath = Str::replaceFirst('storage/', '', $oldImageString);
                } else {
                    $imagePath = $oldImageString;
                }
            }
        }

        // 3. Update data ke Database
        AboutSection::updateOrCreate(
            ['id' => 1],
            [
                'title' => $itemData['title'] ?? null,
                'titleHighlight' => $itemData['titleHighlight'] ?? null,
                'desc_1' => $itemData['desc_1'] ?? null,
                'desc_2' => $itemData['desc_2'] ?? null,
                'image' => $imagePath,
            ]
        );

        return back()->with('success', 'About Section berhasil diperbarui!');
    }

    protected function saveServices(Request $request): mixed
    {
        $data = $request->all();
        $heading = $data['heading'][0] ?? [];
        $gradient = $heading['gradient'] ?? [];
        $items = $data['items'] ?? [];

        ServiceSection::updateOrCreate(
            ['id' => 1],
            [
                'badge' => $heading['badge'] ?? null,
                'title' => $heading['title'] ?? null,
                'titleHighlight' => $heading['titleHighlight'] ?? null,
                'desc' => $heading['desc'] ?? null,
                'from_color' => $gradient['from'] ?? null,
                'via_color' => $gradient['via'] ?? null,
                'to_color' => $gradient['to'] ?? null,
                'deg' => $gradient['deg'] ?? null,
            ]
        );

        Banom::truncate();
        foreach ($items as $item) {
            Banom::create([
                'icon' => $item['icon'] ?? null,
                'title' => $item['title'] ?? null,
                'desc' => $item['desc'] ?? null,
            ]);
        }

        return back();
    }

    protected function savePortfolio(Request $request): mixed
    {
        DB::beginTransaction();

        try {

            $data = $request->all();
            $catData = $data['cat'] ?? [];
            $items = $data['items'] ?? [];

            $oldProjects = project::all();

            /*
        |--------------------------------------------------------------------------
        | CATEGORY
        |--------------------------------------------------------------------------
        */

            $categoriesInput = collect(
                is_string($catData)
                    ? json_decode($catData, true)
                    : ($catData ?? [])
            );

            $cleanCategoryNames = $categoriesInput
                ->map(fn($cat) => is_array($cat)
                    ? ($cat['category'] ?? null)
                    : $cat)
                ->filter(
                    fn($name) => ! empty($name) &&
                        strtolower($name) !== 'all'
                )
                ->unique()
                ->values()
                ->toArray();

            $existingCategories = categori::pluck(
                'nama_kategori',
                'id'
            )->toArray();

            foreach ($existingCategories as $id => $currentName) {

                if (strtolower($currentName) === 'all') {
                    continue;
                }

                if (! in_array($currentName, $cleanCategoryNames)) {
                    categori::where('id', $id)->delete();
                }
            }

            foreach ($cleanCategoryNames as $name) {
                categori::firstOrCreate([
                    'nama_kategori' => $name,
                ]);
            }

            $categories = categori::pluck(
                'id',
                'nama_kategori'
            );

            /*
        |--------------------------------------------------------------------------
        | DELETE PROJECT YANG SUDAH DIHAPUS DI FRONTEND
        |--------------------------------------------------------------------------
        */

            $incomingIds = collect($items)
                ->pluck('id')
                ->filter()
                ->map(fn($id) => (int) $id)
                ->toArray();

            $deletedProjects = project::query()
                ->when(
                    count($incomingIds),
                    fn($q) => $q->whereNotIn('id', $incomingIds),
                    fn($q) => $q
                )
                ->get();

            foreach ($deletedProjects as $deletedProject) {

                if ($deletedProject->image) {
                    Storage::disk('public')
                        ->delete($deletedProject->image);
                }

                if ($deletedProject->video) {
                    Storage::disk('public')
                        ->delete($deletedProject->video);
                }

                $deletedProject->delete();
            }

            /*
        |--------------------------------------------------------------------------
        | SAVE / UPDATE PROJECT
        |--------------------------------------------------------------------------
        */

            foreach ($items as $index => $item) {

                $catName = $item['category'] ?? '';
                $catId = $categories[$catName] ?? null;

                $oldProject = $oldProjects->firstWhere(
                    'id',
                    $item['id'] ?? 0
                );

                /*
            |--------------------------------------------------------------------------
            | IMAGE
            |--------------------------------------------------------------------------
            */

                $imagePath = $item['image'] ?? null;

                if ($request->hasFile("items.{$index}.image")) {

                    $file = $request->file("items.{$index}.image");

                    if ($file && $file->isValid()) {

                        // 🛑 TAMBAHKAN VALIDASI UKURAN DI SINI (Maksimal 10 MB dalam hitungan Bytes)
                        $maxSizeInBytes = 10 * 1024 * 1024; // 10,485,760 Bytes
                        if ($file->getSize() > $maxSizeInBytes) {
                            // Anda bisa melempar error validation atau kembali dengan pesan error
                            return redirect()->back()->withErrors([
                                "items.{$index}.image" => "Ukuran file gambar tidak boleh melebihi 10 MB."
                            ]);
                        }

                        if (
                            $oldProject &&
                            $oldProject->image
                        ) {
                            Storage::disk('public')
                                ->delete($oldProject->image);
                        }

                        $fileName =
                            'portfolio_' .
                            time() . '_' .
                            Str::random(5) . '.' .
                            $file->getClientOriginalExtension();

                        $file->storeAs(
                            'portfolio',
                            $fileName,
                            'public'
                        );

                        $imagePath =
                            'portfolio/' . $fileName;
                    }
                }

                /*
            |--------------------------------------------------------------------------
            | VIDEO
            |--------------------------------------------------------------------------
            */

                $videoPath = $item['video'] ?? null;

                if ($request->hasFile("items.{$index}.video")) {

                    $file = $request->file("items.{$index}.video");

                    if ($file && $file->isValid()) {

                        if (
                            $oldProject &&
                            $oldProject->video
                        ) {
                            Storage::disk('public')
                                ->delete($oldProject->video);
                        }

                        $fileName =
                            'video_' .
                            time() . '_' .
                            Str::random(5) . '.' .
                            $file->getClientOriginalExtension();

                        $file->storeAs(
                            'portfolio/videos',
                            $fileName,
                            'public'
                        );

                        $videoPath =
                            'portfolio/videos/' . $fileName;
                    }
                }

                $payload = [
                    'id_kategori' => $catId,
                    'sub_kategori' => $item['sub_kategori'] ?? null,
                    'title' => $item['title'] ?? null,
                    'desc' => $item['desc'] ?? null,
                    'image' => $imagePath,
                    'guest_count' => $item['guest_count'] ?? null,
                    'location' => $item['location'] ?? null,
                    'preparation_time' => $item['preparation_time'] ?? null,
                    'challenge' => $item['challenge'] ?? null,
                    'solution' => $item['solution'] ?? null,
                    'results' => $item['results'] ?? null,
                    'video' => $videoPath,
                    'is_featured' => true,
                ];

                if (! empty($item['id'])) {

                    project::where(
                        'id',
                        $item['id']
                    )->update($payload);
                } else {

                    project::create($payload);
                }
            }

            DB::commit();

            return back();
        } catch (\Throwable $e) {

            DB::rollBack();

            throw $e;
        }
    }

    protected function saveWhyChooseUs(Request $request): mixed
    {
        $items = $request->input('items', []);

        chooseUs::truncate();
        foreach ($items as $item) {
            $value = is_string($item) ? $item : ($item['label'] ?? $item['text'] ?? '');
            chooseUs::create(['value' => $value]);
        }

        return back();
    }

    protected function saveStatistics(Request $request): mixed
    {
        $items = $request->input('items', []);

        statistik::truncate();
        foreach ($items as $item) {
            statistik::create([
                'value' => (int) ($item['value'] ?? 0),
                'suffix' => $item['suffix'] ?? '',
                'label' => $item['label'] ?? '',
            ]);
        }

        return back();
    }

    protected function savePartners(Request $request): mixed
    {
        $items = $request->input('items', []);

        // 1. Ambil data partner lama sebelum di-truncate untuk referensi hapus file fisik nanti
        $oldPartners = partner::all();

        // 2. Kosongkan tabel partner lama
        partner::truncate();

        // 3. Lakukan looping data dari frontend
        foreach ($items as $index => $item) {
            // Default-nya gunakan logo lama yang dikirim (berupa string path)
            // Dari frontend, jika gambar tidak diganti, biasanya mengirim string path seperti 'logo/namafile.jpg'
            $imagePath = $item['logo'] ?? null;

            // 4. Cek apakah ada file upload baru khusus untuk indeks ini
            if ($request->hasFile("items.{$index}.logo")) {
                $file = $request->file("items.{$index}.logo");

                if ($file->isValid()) {
                    // Generate nama file unik baru
                    $fileName = 'logo_' . time() . '_' . Str::random(5) . '.' . $file->getClientOriginalExtension();

                    // Simpan file fisik ke folder storage/app/public/partner
                    $file->storeAs('partner', $fileName, 'public');

                    // Path baru untuk disimpan ke database
                    $imagePath = 'partner/' . $fileName;

                    // 5. Hapus file lama di server jika partner ini sebelumnya sudah ada
                    if (isset($item['name'])) {
                        $oldPartner = $oldPartners->firstWhere('nama', $item['name']);

                        if ($oldPartner && $oldPartner->logo) {
                            // Hapus gambar lama dari disk public
                            Storage::disk('public')->delete($oldPartner->logo);
                        }
                    }
                }
            }

            // 6. Buat data partner baru ke database
            partner::create([
                'nama' => $item['name'] ?? $item['nama'] ?? null,
                'logo' => $imagePath,
            ]);
        }

        return back();
    }

    protected function saveTestimonials(Request $request): mixed
    {
        // Ambil items dari request
        $items = $request->input('items', []);

        // AMAN DARI PENGHAPUSAN MAHLUK GAIB:
        // Ambil array ID yang memang sengaja dihapus oleh user dari frontend (misal: deleted_ids = [1, 3])
        $deletedIds = $request->input('deleted_ids', []);
        if (! empty($deletedIds)) {
            $testimonisToIdDelete = testimoni::whereIn('id', $deletedIds)->get();
            foreach ($testimonisToIdDelete as $oldDelete) {
                if ($oldDelete->image && Storage::disk('public')->exists($oldDelete->image)) {
                    Storage::disk('public')->delete($oldDelete->image);
                }
                $oldDelete->delete();
            }
        }

        // Ambil semua data testimoni lama yang tersisa dari database untuk dicocokkan
        $oldTestimonis = testimoni::all();

        // 2. PROSES UPDATE ATAU INSERT DATA BARU
        foreach ($items as $index => $item) {
            // Filter ID agar benar-benar berupa angka/string valid (bukan "null" atau "undefined")
            $id = isset($item['id']) && $item['id'] !== 'null' && $item['id'] !== 'undefined' && ! empty($item['id'])
                ? $item['id']
                : null;

            // Cari data lama: Prioritas berdasarkan ID, jika tidak ada cari berdasarkan nama & event (Pencegahan duplikasi)
            $oldTestimoni = null;
            if ($id) {
                $oldTestimoni = $oldTestimonis->firstWhere('id', $id);
            } else {
                $oldTestimoni = $oldTestimonis->where('nama', $item['name'] ?? '')
                    ->where('event', $item['event'] ?? '')
                    ->first();
            }

            // Setel default image path dari data lama
            $imagePath = $oldTestimoni ? $oldTestimoni->image : null;

            // Jika frontend mengirimkan path string lama yang valid (bukan file/bukan kosong), pakai data tersebut
            if (isset($item['image']) && is_string($item['image']) && ! empty($item['image']) && ! Str::contains($item['image'], '[object File]')) {
                $imagePath = Str::after($item['image'], '/storage/');
            }

            // Cek apakah ada file upload baru khusus untuk indeks ini
            if ($request->hasFile("items.{$index}.image")) {
                $file = $request->file("items.{$index}.image");

                if ($file->isValid()) {
                    // Berikan nama file unik
                    $fileName = 'logo_' . time() . '_' . $index . '_' . Str::random(5) . '.' . $file->getClientOriginalExtension();

                    // Simpan file fisik
                    $file->storeAs('testimoni', $fileName, 'public');

                    // Hapus file lama di server jika ada penggantian gambar
                    if ($oldTestimoni && $oldTestimoni->image && Storage::disk('public')->exists($oldTestimoni->image)) {
                        Storage::disk('public')->delete($oldTestimoni->image);
                    }

                    $imagePath = 'testimoni/' . $fileName;
                }
            }

            // Siapkan payload data
            $payload = [
                'project_id' => $item['project_id'] ?? null,
                'nama' => $item['name'] ?? null,
                'image' => $imagePath,
                'event' => $item['event'] ?? null,
                'review' => $item['review'] ?? null,
                'jabatan' => $item['role'] ?? null,
                'rating' => (string) ($item['rating'] ?? 5),
            ];

            // Eksekusi Upsert yang aman
            if ($oldTestimoni) {
                $oldTestimoni->update($payload);
            } else {
                testimoni::create($payload);
            }
        }

        return back();
    }

    protected function saveGallery(Request $request): mixed
    {
        DB::beginTransaction();

        try {

            $items = $request->input('items', []);

            /*
        |--------------------------------------------------------------------------
        | Ambil semua gallery lama
        |--------------------------------------------------------------------------
        */

            $existingGalleries = Galery::with('images')->get();

            /*
        |--------------------------------------------------------------------------
        | Hapus gallery yang sudah tidak ada di frontend
        |--------------------------------------------------------------------------
        */

            $incomingIds = collect($items)
                ->pluck('id')
                ->filter()
                ->map(fn($id) => (int) $id)
                ->toArray();

            $deletedGalleries = Galery::with('images')
                ->whereNotIn('id', $incomingIds)
                ->get();

            foreach ($deletedGalleries as $gallery) {

                foreach ($gallery->images as $image) {

                    if ($image->image) {
                        Storage::disk('public')->delete($image->image);
                    }

                    $image->delete();
                }

                $gallery->delete();
            }

            /*
        |--------------------------------------------------------------------------
        | Save Gallery
        |--------------------------------------------------------------------------
        */

            foreach ($items as $index => $item) {

                /*
            |--------------------------------------------------------------------------
            | Create / Update Gallery
            |--------------------------------------------------------------------------
            */

                if (! empty($item['id'])) {

                    $galery = Galery::find($item['id']);

                    if (! $galery) {
                        continue;
                    }

                    $galery->update([
                        'project_id' => $item['project_id'] ?? null,
                        'label' => $item['label'] ?? null,
                        'tampil' => true,
                    ]);
                } else {

                    $galery = Galery::create([
                        'project_id' => $item['project_id'] ?? null,
                        'label' => $item['label'] ?? null,
                        'tampil' => true,
                    ]);
                }

                /*
            |--------------------------------------------------------------------------
            | Existing Images
            |--------------------------------------------------------------------------
            */

                $oldImages = GalleryImage::where(
                    'galery_id',
                    $galery->id
                )->get();

                $savedImageIds = [];

                $images = $item['image'] ?? [];

                if (! is_array($images)) {
                    $images = [$images];
                }

                $maxImages = 10;

                for ($subIndex = 0; $subIndex < $maxImages; $subIndex++) {

                    $imagePath = null;

                    /*
                |--------------------------------------------------------------------------
                | Upload File Baru
                |--------------------------------------------------------------------------
                */

                    if (
                        $request->hasFile(
                            "items.{$index}.image.{$subIndex}"
                        )
                    ) {

                        $file = $request->file(
                            "items.{$index}.image.{$subIndex}"
                        );

                        if ($file && $file->isValid()) {

                            $fileName =
                                'gallery_' .
                                time() . '_' .
                                Str::random(5) .
                                '.' .
                                $file->getClientOriginalExtension();

                            $file->storeAs(
                                'gallery',
                                $fileName,
                                'public'
                            );

                            $imagePath =
                                'gallery/' . $fileName;
                        }
                    } elseif (
                        isset($images[$subIndex]) &&
                        is_string($images[$subIndex]) &&
                        ! empty($images[$subIndex])
                    ) {

                        $imagePath = $images[$subIndex];
                    }

                    if (! $imagePath) {
                        continue;
                    }

                    /*
                |--------------------------------------------------------------------------
                | Simpan Gallery Image
                |--------------------------------------------------------------------------
                */

                    $galleryImage = GalleryImage::updateOrCreate(
                        [
                            'galery_id' => $galery->id,
                            'sort_order' => $subIndex,
                        ],
                        [
                            'image' => $imagePath,
                        ]
                    );

                    $savedImageIds[] = $galleryImage->id;
                }

                /*
            |--------------------------------------------------------------------------
            | Hapus gambar yang sudah tidak ada
            |--------------------------------------------------------------------------
            */

                $deletedImages = GalleryImage::where(
                    'galery_id',
                    $galery->id
                )
                    ->whereNotIn('id', $savedImageIds)
                    ->get();

                foreach ($deletedImages as $deletedImage) {

                    if ($deletedImage->image) {
                        Storage::disk('public')
                            ->delete($deletedImage->image);
                    }

                    $deletedImage->delete();
                }
            }

            DB::commit();

            return back();
        } catch (\Throwable $e) {

            DB::rollBack();

            throw $e;
        }
    }

    protected function saveWorkflow(Request $request): mixed
    {
        $items = $request->input('items', []);

        workflow::truncate();
        foreach ($items as $i => $item) {
            workflow::create([
                'step' => (int) ($item['step'] ?? $i + 1),
                'title' => $item['title'] ?? null,
                'desc' => $item['desc'] ?? null,
            ]);
        }

        return back();
    }

    protected function saveCta(Request $request): mixed
    {
        $data = $request->all();
        $gradient = $data['gradient'] ?? [];
        $buttons = $data['buttons'] ?? [];

        CtaSection::truncate();
        foreach ($buttons as $btn) {
            CtaSection::create([
                'media' => $btn['platform'] ?? $btn['media'] ?? null,
                'label' => $btn['label'] ?? null,
                'url' => $btn['url'] ?? null,
                'is_active' => $btn['enabled'] ?? true,
                'from_color' => $gradient['from'] ?? null,
                'via_color' => $gradient['via'] ?? null,
                'to_color' => $gradient['to'] ?? null,
                'deg_color' => $gradient['deg_color'] ?? $gradient['angle'] ?? null,
            ]);
        }

        return back();
    }

    protected function saveFooter(Request $request): mixed
    {
        // Jalankan validasi opsional untuk memastikan integritas data
        $validated = $request->validate([
            'brandName' => 'nullable|string|max:255',
            'brandHighlight' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'copyright' => 'nullable|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'contact' => 'nullable|array',
            'email' => 'nullable|email|max:255',
            'whatsapp' => 'nullable|string|max:50',
            'whatsappUrl' => 'nullable|url|max:255',
            'address' => 'nullable|string',
        ]);

        // Menggunakan updateOrCreate atau update berdasarkan ID 1
        footer::updateOrCreate(
            ['id' => 1],
            [
                'brandName' => $validated['brandName'] ?? null,
                'brandHighlight' => $validated['brandHighlight'] ?? null,
                'description' => $validated['description'] ?? null,
                'email' => $validated['email'] ?? null,
                'whatsapp' => $validated['whatsapp'] ?? null,
                'whatsappUrl' => $validated['whatsappUrl'] ?? null,
                'address' => $validated['address'] ?? null,
                'copyright' => $validated['copyright'] ?? null,
                'tagline' => $validated['tagline'] ?? null,
            ]
        );

        return back()->with('success', 'Footer berhasil diperbarui!');
    }

    protected function savePrice(Request $request): mixed
    {
        // dd($request->all(), $request->file());

        $idBanom = $request->input('id_banom');
        $banom = Banom::find($idBanom);

        if (! $banom) {
            return back()->withErrors(['error' => 'Service not found']);
        }

        // Gunakan transaksi database agar aman
        DB::beginTransaction();

        try {
            $imageServicesData = $request->input('image_services', []);
            $savedImageServiceIds = [];
            $catTempMap = [];

            foreach ($imageServicesData as $index => $isItem) {

                if (!is_array($isItem)) {
                    continue;
                }

                $isId = $isItem['id'] ?? null;

                if (empty($isId) || $isId === 'null') {
                    $isId = null;
                }

                /*
    |--------------------------------------------------------------------------
    | Ambil data lama
    |--------------------------------------------------------------------------
    */
                $imageService = null;

                if ($isId) {
                    $imageService = ImageService::find($isId);
                }

                /*
    |--------------------------------------------------------------------------
    | Nama gambar lama
    |--------------------------------------------------------------------------
    */
                $imagePath = $imageService?->image;

                /*
    |--------------------------------------------------------------------------
    | Jika upload gambar baru
    |--------------------------------------------------------------------------
    */
                $uploadedFile = data_get(
                    $request->file(),
                    "image_services.$index.image"
                );

                if ($uploadedFile instanceof UploadedFile) {

                    // hapus gambar lama
                    if (
                        !empty($imagePath) &&
                        Storage::disk('public')->exists($imagePath)
                    ) {
                        Storage::disk('public')->delete($imagePath);
                    }

                    // simpan gambar baru
                    $imagePath = $uploadedFile->store(
                        'imageService',
                        'public'
                    );
                }

                /*
    |--------------------------------------------------------------------------
    | Simpan Database
    |--------------------------------------------------------------------------
    */
                $imageService = ImageService::updateOrCreate(
                    [
                        'id' => $isId
                    ],
                    [
                        'id_banom' => $idBanom,
                        'name'      => $isItem['name'] ?? '',
                        'image'     => $imagePath,
                    ]
                );

                $savedImageServiceIds[] = $imageService->id;

                if (!empty($isItem['_temp_id'])) {
                    $catTempMap[$isItem['_temp_id']] = $imageService->id;
                }
            }

            // Hapus kategori yang tidak dikirim kembali (berarti dihapus oleh user)
            ImageService::where('id_banom', $idBanom)
                ->whereNotIn('id', $savedImageServiceIds)
                ->delete();

            $items = $request->input('items', []);
            $savedPriceIds = [];

            foreach ($items as $item) {
                if (! is_array($item)) continue;

                $idImageService = $item['id_image_service'] ?? null;

                // SINKRONISASI: Ganti string temporary dengan ID asli yang baru saja dibuat
                if (is_string($idImageService) && isset($catTempMap[$idImageService])) {
                    $idImageService = $catTempMap[$idImageService];
                }

                if (is_string($idImageService) && ($idImageService === 'null' || !is_numeric($idImageService))) {
                    $idImageService = null;
                }

                $itemId = $item['id'] ?? null;
                if (is_string($itemId) && $itemId === 'null') {
                    $itemId = null;
                }

                $priceService = PriceService::updateOrCreate(
                    ['id' => $itemId],
                    [
                        'id_banom' => $idBanom,
                        'id_image_service' => $idImageService,
                        'paket_name' => $item['paket_name'] ?? '',
                        'paket_desc' => $item['paket_desc'] ?? '',
                        'populer' => $item['populer'] ?? false,
                    ]
                );

                $savedPriceIds[] = $priceService->id;

                // Refresh list paket
                ListPaket::where('id_price_service', $priceService->id)->delete();

                $listItems = $item['list'] ?? [];
                if (is_array($listItems)) {
                    foreach ($listItems as $i => $li) {
                        if (! is_array($li)) continue;
                        ListPaket::create([
                            'id_price_service' => $priceService->id,
                            'item_name' => $li['item_name'] ?? '',
                            'nominal' => $li['nominal'] ?? null,
                            'sort_order' => $i,
                        ]);
                    }
                }
            }

            // Hapus paket harga yang tidak dikirim kembali
            PriceService::where('id_banom', $idBanom)
                ->whereNotIn('id', $savedPriceIds)
                ->delete();
            
            DB::commit(); // Terapkan perubahan jika sukses semua


dd(
    ImageService::count(),
    PriceService::count(),
    ListPaket::count()
);
            return back();
        } catch (\Throwable $e) {
    DB::rollBack();

    dd(
        $e->getMessage(),
        $e->getFile(),
        $e->getLine()
    );
}
    }

    public function saveGalleryItem(Request $request)
    {
        $data = $request->all();

        $galery = Galery::create([
            'project_id' => $data['project_id'] ?? null,
            'label' => $data['label'] ?? null,
            'tampil' => true,
        ]);

        $images = $data['image'] ?? [];
        if (! is_array($images)) {
            $images = [$images];
        }

        for ($subIndex = 0; $subIndex < count($images); $subIndex++) {
            $imagePath = null;

            if ($request->hasFile("image.{$subIndex}")) {
                $file = $request->file("image.{$subIndex}");
                if ($file && $file->isValid()) {
                    $fileName = 'gallery_' . time() . '_' . Str::random(5) . '.' . $file->getClientOriginalExtension();
                    $file->storeAs('gallery', $fileName, 'public');
                    $imagePath = 'gallery/' . $fileName;
                }
            } elseif (isset($images[$subIndex]) && is_string($images[$subIndex]) && ! empty($images[$subIndex])) {
                $imagePath = $images[$subIndex];
            }

            if ($imagePath) {
                GalleryImage::create([
                    'galery_id' => $galery->id,
                    'image' => $imagePath,
                    'sort_order' => $subIndex,
                ]);
            }
        }

        return back()->with('success', 'Gallery berhasil ditambahkan!');
    }

    public function updateGalleryItem(Request $request, $id)
    {
        $galery = Galery::findOrFail($id);
        $data = $request->all();

        $galery->update([
            'project_id' => $data['project_id'] ?? $galery->project_id,
            'label' => $data['label'] ?? $galery->label,
            'tampil' => true,
        ]);

        $images = $data['image'] ?? [];
        if (! is_array($images)) {
            $images = [$images];
        }

        $savedImageIds = [];

        for ($subIndex = 0; $subIndex < count($images); $subIndex++) {
            $imagePath = null;

            if ($request->hasFile("image.{$subIndex}")) {
                $file = $request->file("image.{$subIndex}");
                if ($file && $file->isValid()) {
                    $fileName = 'gallery_' . time() . '_' . Str::random(5) . '.' . $file->getClientOriginalExtension();
                    $file->storeAs('gallery', $fileName, 'public');
                    $imagePath = 'gallery/' . $fileName;
                }
            } elseif (isset($images[$subIndex]) && is_string($images[$subIndex]) && ! empty($images[$subIndex])) {
                $imagePath = $images[$subIndex];
            }

            if ($imagePath) {
                $galleryImage = GalleryImage::updateOrCreate(
                    [
                        'galery_id' => $galery->id,
                        'sort_order' => $subIndex,
                    ],
                    ['image' => $imagePath]
                );
                $savedImageIds[] = $galleryImage->id;
            }
        }

        $deletedImages = GalleryImage::where('galery_id', $galery->id)
            ->whereNotIn('id', $savedImageIds)
            ->get();

        foreach ($deletedImages as $deletedImage) {
            if ($deletedImage->image) {
                Storage::disk('public')->delete($deletedImage->image);
            }
            $deletedImage->delete();
        }

        return back()->with('success', 'Gallery berhasil diperbarui!');
    }

    public function deleteGalleryItem($id)
    {
        $galery = Galery::with('images')->findOrFail($id);

        foreach ($galery->images as $image) {
            if ($image->image) {
                Storage::disk('public')->delete($image->image);
            }
            $image->delete();
        }

        $galery->delete();

        return back()->with('success', 'Gallery berhasil dihapus!');
    }
}
