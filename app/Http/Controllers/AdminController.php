<?php

namespace App\Http\Controllers;

use App\Models\AboutSection;
use App\Models\Banom;
use App\Models\categori;
use App\Models\chooseUs;
use App\Models\CtaSection;
use App\Models\footer;
use App\Models\Galery;
use App\Models\HeroSection;
use App\Models\partner;
use App\Models\project;
use App\Models\ServiceSection;
use App\Models\statistik;
use App\Models\testimoni;
use App\Models\Visitor;
use App\Models\workflow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        // Hero Section Data
        $modelHero = HeroSection::all();
        $heroData = [
            'title' => 'Hero Section',
            'items' => $modelHero,
        ];

        // About Section Data
        $modelAbout = AboutSection::all();
        $aboutData = [
            'title' => 'About Section',
            'items' => $modelAbout,
        ];

        // Services Section Data
        $modelServices = ServiceSection::all();
        $work = Banom::all();
        $servicesData = [
            'heading' => $modelServices,
            'items' => $work,
        ];

        // Portfolio Section Data
        // Gunakan Eager Loading (with) agar query database jauh lebih cepat dan efisien (menghindari N+1 problem)
        $modelPortfolio = project::with('categori')->get();

        $project = $modelPortfolio->map(function ($p) {
            return [
                'id' => $p->id ?? null,
                // Panggil properti lewat nama relasinya, bukan id_kategori
                'sub_kategori' => $p->sub_kategori ?? null,
                'category' => $p->categori ? $p->categori->nama_kategori : null,
                'title' => $p->title ?? null,
                'desc' => $p->desc ?? null,
                'image' => $p->image ?? null,
                'guest_count' => $p->guest_count ?? null,
                'location' => $p->location ?? null,
                'preparation_time' => $p->preparation_time ?? null,
                'challenge' => $p->challenge ?? null,
                'solution' => $p->solution ?? null,
                'results' => $p->results ?? null,
                'video' => $p->video ?? null,
                'is_featured' => $p->is_featured ?? null,
            ];
        })->toArray();
        // categori Data
        $modelCategori = categori::all();
        $cat = $modelCategori->map(function ($p) {
            return [
                'category' => $p->nama_kategori ?? null,
            ];
        })->toArray();

        $portfolioData = [
            'items' => $project,
            'cat' => $cat,
        ];

        // why us choose us
        $whyUs = chooseUs::all();
        $whyChooseUs = [
            'items' => $whyUs->map(function ($cus) {
                return [
                    'label' => $cus->value ?? null,
                ];
            })->toArray(),
        ];

        // statistics data
        $statistics = statistik::all();
        $statisticsData = [
            'items' => $statistics->map(function ($stat) {
                return [
                    'label' => $stat->label ?? null,
                    'suffix' => $stat->suffix ?? null,
                    'value' => $stat->value ?? null,
                ];
            })->toArray(),
        ];

        $eventStat = $statistics->where('label', 'Event')->first();
        $aboutData['itemss'] = $eventStat ? [
            'label' => $eventStat->label,
            'suffix' => $eventStat->suffix,
            'value' => $eventStat->value,
        ] : [];

        // partner data
        $partners = partner::all();
        $partnerData = [
            'items' => $partners->map(function ($p) {
                return [
                    'name' => $p->nama ?? null,
                    'logo' => $p->logo ?? null,
                ];
            })->toArray(),
        ];

        // testimonials Data
        $projectName = project::select('id', 'title')->get();
        $testimonials = testimoni::all();
        $testimoniData = [
            'items' => $testimonials->map(function ($t) {
                return [
                    'project_id' => $t->project_id ?? null,
                    'image' => $t->image ?? null,
                    'name' => $t->nama ?? null,
                    'event' => $t->event ?? null,
                    'role' => $t->jabatan ?? null,
                    'review' => $t->review ?? null,
                    'rating' => (int) $t->rating ?? null,
                ];
            })->toArray(),
            'project' => $projectName->map(function ($p) {
                return [
                    'id' => $p->id,
                    'nama_project' => $p->title,
                ];
            }),
        ];

        // gallery data
        $galleries = Galery::with(['images', 'project:id,title'])->where('tampil', true)->get();

        $galeryData = [
            'items' => $galleries->map(function ($g) {
                return [
                    'id' => $g->id,
                    'project_id' => $g->project_id, // WAJIB DITAMBAHKAN AGAR FRONTEND TAHU ID-NYA
                    'nama_project' => $g->project->title ?? null,
                    'image' => $g->images->pluck('image')->toArray(),
                    'label' => $g->label ?? null,
                ];
            })->toArray(),
            'project' => $projectName->map(function ($p) {
                return [
                    'id' => $p->id,
                    'nama_project' => $p->title,
                ];
            }),
        ];

        // workflow data
        $workflows = workflow::orderBy('step', 'asc')->get();
        $workflowData = [
            'items' => $workflows->map(function ($w) {
                return [
                    'step' => $w->step ?? null,
                    'title' => $w->title ?? null,
                    'desc' => $w->desc ?? null,
                    'icon' => $w->icon ?? null,
                ];
            })->toArray(),
        ];

        // cta Data
        $cta = CtaSection::find(1);
        $defaultCta = [
            'from' => $cta->from_color ?? null,
            'to' => $cta->to_color ?? null,
            'via' => $cta->via_color ?? null,
            'deg_color' => $cta->deg_color ?? null,
        ];

        // footer Data
        $footer = footer::find(1);
        $defaultFooter = [
            'items' => [
                'brandName' => $footer->brandName ?? null,
                'brandHighlight' => $footer->brandHighlight ?? null,
                'description' => $footer->description ?? null,
                'services' => $work,
                'contact' => [
                    'email' => $footer->email ?? null,
                    'phone' => $footer->whatsapp ?? null,
                    'address' => $footer->address ?? null,
                    'whatsappUrl' => $footer->whatsappUrl ?? null,
                ],
                'copyright' => $footer->copyright ?? null,
                'tagline' => $footer->tagline ?? null,
            ],
        ];

        // ── Visitor Statistics ──
        try {
            $localeDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
            $localeMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

            $todayVisitors = Visitor::whereDate('visited_at', today())->count();
            $todayUnique = Visitor::whereDate('visited_at', today())
                ->distinct('ip_address')
                ->count('ip_address');

            $dailyStats = Visitor::where('visited_at', '>=', today()->subDays(29))
                ->selectRaw('DATE(visited_at) as date, COUNT(*) as hits, COUNT(DISTINCT ip_address) as unique_visitors')
                ->groupBy('date')
                ->orderBy('date')
                ->pluck('hits', 'date');

            $dailyUnique = Visitor::where('visited_at', '>=', today()->subDays(29))
                ->selectRaw('DATE(visited_at) as date, COUNT(DISTINCT ip_address) as unique_visitors')
                ->groupBy('date')
                ->orderBy('date')
                ->pluck('unique_visitors', 'date');

            $weekly = collect();
            for ($i = 6; $i >= 0; $i--) {
                $date = today()->subDays($i);
                $dateStr = $date->toDateString();
                $weekly->push([
                    'day' => $localeDays[(int) $date->format('w')],
                    'visitors' => (int) ($dailyUnique[$dateStr] ?? 0),
                    'pageViews' => (int) ($dailyStats[$dateStr] ?? 0),
                ]);
            }

            $monthly = collect();
            for ($i = 29; $i >= 0; $i--) {
                $date = today()->subDays($i);
                $dateStr = $date->toDateString();
                $monthly->push([
                    'day' => $date->isoFormat('D MMM'),
                    'visitors' => (int) ($dailyUnique[$dateStr] ?? 0),
                    'pageViews' => (int) ($dailyStats[$dateStr] ?? 0),
                ]);
            }

            // ── Perbaikan Query Tahunan (Menghitung Akumulasi Unik Harian per Bulan) ──
            // ── Menggunakan $monthlyStatsQuery dengan Benar ──
            $monthlyStatsQuery = Visitor::where('visited_at', '>=', now()->subMonthsNoOverflow(11)->startOfMonth());
            $driver = DB::connection()->getDriverName();

            if ($driver === 'mysql') {
                // Modifikasi $monthlyStatsQuery yang sudah ada untuk dijadikan Subquery
                $subQuery = $monthlyStatsQuery
                    ->selectRaw("DATE_FORMAT(visited_at, '%Y-%m') as month, DATE(visited_at) as date, COUNT(DISTINCT ip_address) as daily_unique, COUNT(*) as daily_hits")
                    ->groupBy('month', 'date');

                // Query utama untuk menjumlahkan (SUM) hasil unik harian ke dalam bulan terkait
                $monthlyStats = DB::table(DB::raw("({$subQuery->toSql()}) as sub"))
                    ->mergeBindings($subQuery->getQuery())
                    ->selectRaw("month, SUM(daily_hits) as hits, SUM(daily_unique) as unique_visitors")
                    ->groupBy('month')
                    ->get()
                    ->keyBy('month');
            } else {
                // Modifikasi $monthlyStatsQuery untuk SQLite (testing/local)
                $subQuery = $monthlyStatsQuery
                    ->selectRaw("strftime('%Y-%m', visited_at) as month, DATE(visited_at) as date, COUNT(DISTINCT ip_address) as daily_unique, COUNT(*) as daily_hits")
                    ->groupBy('month', 'date');

                $monthlyStats = DB::table(DB::raw("({$subQuery->toSql()}) as sub"))
                    ->mergeBindings($subQuery->getQuery())
                    ->selectRaw("month, SUM(daily_hits) as hits, SUM(daily_unique) as unique_visitors")
                    ->groupBy('month')
                    ->get()
                    ->keyBy('month');
            }

            $yearly = collect();
            for ($i = 11; $i >= 0; $i--) {
                $date = now()->subMonthsNoOverflow($i);
                $monthKey = $date->format('Y-m');
                $monthName = $localeMonths[(int) $date->format('n') - 1];
                $stat = $monthlyStats[$monthKey] ?? null;

                $yearly->push([
                    'month' => $monthName,
                    // Sekarang nilainya adalah total penjumlahan dari unique visitor harian sepanjang bulan itu
                    'visitors' => (int) ($stat->unique_visitors ?? 0),
                    'pageViews' => (int) ($stat->hits ?? 0),
                ]);
            }

            $visitorStats = [
                'today' => ['visitors' => $todayUnique, 'pageViews' => $todayVisitors],
                'weekly' => $weekly,
                'monthly' => $monthly,
                'yearly' => $yearly,
            ];
        } catch (\Throwable $e) {
            $visitorStats = [
                'today' => ['visitors' => 0, 'pageViews' => 0],
                'weekly' => [],
                'monthly' => [],
                'yearly' => [],
            ];
        }

        $priceServices = Banom::with('priceServices.listPakets', 'priceServices.imageService')->get()->map(function ($b) {
            return [
                'id' => $b->id,
                'title' => $b->title,
                'price_services' => $b->priceServices->map(function ($ps) {
                    return [
                        'id' => $ps->id,
                        'paket_name' => $ps->paket_name,
                        'paket_desc' => $ps->paket_desc,
                        'id_image_service' => $ps->id_image_service,
                        'image_service' => $ps->imageService ? [
                            'id' => $ps->imageService->id,
                            'name' => $ps->imageService->name,
                            'image' => $ps->imageService->image,
                        ] : null,
                        'populer' => $ps->populer,
                        'list_pakets' => $ps->listPakets->sortBy('sort_order')->values()->map(function ($lp) {
                            return [
                                'id' => $lp->id,
                                'item_name' => $lp->item_name,
                                'nominal' => $lp->nominal,
                            ];
                        }),
                    ];
                }),
                'image_services' => $b->imageServices->map(function ($is) {
                    return [
                        'id' => $is->id,
                        'name' => $is->name,
                        'image' => $is->image,
                    ];
                }),
            ];
        })->toArray();

        $data = [
            'title' => 'Admin',
            'heroData' => $heroData,
            'aboutData' => $aboutData,
            'servicesData' => $servicesData,
            'work' => $work,
            'portfolioData' => $portfolioData,
            'whyChooseUs' => $whyChooseUs,
            'statisticsData' => $statisticsData,
            'partner' => $partnerData,
            'testimoni' => $testimoniData,
            'galery' => $galeryData,
            'workflow' => $workflowData,
            'ctaData' => $defaultCta,
            'footer' => $defaultFooter,
            'visitorStats' => $visitorStats,
            'priceData' => ['services' => $priceServices],
        ];

        return Inertia::render('admin/AdminLayout', $data);
    }

    public function login()
    {
        if (Auth::check()) {
            return redirect('/admin');
        }

        return Inertia::render('admin/Login');
    }

    public function loginSubmit(Request $request)
    {
        $password = $request->input('password');
        $adminName = env('ADMIN_NAME', 'admin');

        if (Auth::attempt(['name' => $adminName, 'password' => $password])) {
            $request->session()->regenerate();

            return redirect('/admin');
        }

        return back()->withErrors(['password' => 'Password salah!']);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken(); // Tambahkan ini demi keamanan token CSRF baru

        return redirect('/login');
    }
}
