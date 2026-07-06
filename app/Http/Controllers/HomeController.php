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
use App\Models\partner;
use App\Models\project;
use App\Models\ServiceSection;
use App\Models\statistik;
use App\Models\testimoni;
use App\Models\workflow;
use Inertia\Inertia;

class HomeController extends Controller
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
                'sub_kategori' => $p->sub_kategori ?? null,
                'category' => $p->categori ? $p->categori->nama_kategori : null,
                'title' => $p->title ?? null,
                'desc' => $p->desc ?? null,
                'image' => $p->image ?? null,
                'guest_count' => $p->guest_count ?? null,
                'location' => $p->location ?? null,
                'preparation_time' => $p->preparation_time ?? null,
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
            'id' => $eventStat->id,
            'label' => $eventStat->label,
            'value' => $eventStat->value,
            'suffix' => $eventStat->suffix,
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
        ];

        // Galery Data
        $galleries = Galery::with(['images', 'project:id,title'])->where('tampil', true)->limit(8)->get();
        $galeryData = [
            'items' => $galleries->map(function ($g) {
                return [
                    'id' => $g->id,
                    'image' => $g->images->pluck('image')->toArray(),
                    'label' => $g->project->title ?? null,
                ];
            })->toArray(),
        ];

        // workflow data
        $workflows = workflow::all();
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
            'title' => 'Home',
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
            'priceData' => ['services' => $priceServices],
        ];

        return Inertia::render('Home', $data);
    }

    public function detailService($id)
    {
        $service = Banom::where('id', $id)->firstOrFail();
        $footerModel = footer::find(1);
        $work = Banom::all();

        $footerData = [
            'items' => [
                'brandName' => $footerModel->brandName ?? null,
                'brandHighlight' => $footerModel->brandHighlight ?? null,
                'description' => $footerModel->description ?? null,
                'services' => $work,
                'contact' => [
                    'email' => $footerModel->email ?? null,
                    'phone' => $footerModel->whatsapp ?? null,
                    'address' => $footerModel->address ?? null,
                    'whatsappUrl' => $footerModel->whatsappUrl ?? null,
                ],
                'copyright' => $footerModel->copyright ?? null,
                'tagline' => $footerModel->tagline ?? null,
            ],
        ];

        $priceServ = Banom::where('id', $id)->with('priceServices.listPakets', 'priceServices.imageService')->first();
        
        $priceServices = [
                'id' => $priceServ->id,
                'title' => $priceServ->title,
                'price_services' => $priceServ->priceServices->map(function ($ps) {
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
                'image_services' => $priceServ->imageServices->map(function ($is) {
                    return [
                        'id' => $is->id,
                        'name' => $is->name,
                        'image' => $is->image,
                    ];
                }),
            ];

        return Inertia::render('detail/DetailService', [
            'service' => [
                'id' => $service->id,
                'title' => $service->title,
                'desc' => $service->desc,
            ],
            'priceData' => ['services' => $priceServices],
            'footer' => $footerData,
        ]);
    }

    public function detailPortfolio($id)
    {
        // Menggunakan firstOrFail agar jika ID ngawur, Laravel otomatis melempar 404 (bukan null)
        $project = project::with(['categori', 'testimonials', 'galleries'])->where('id', $id)->firstOrFail();

        $relatedProjects = project::with('categori')
            ->where('id_kategori', $project->id_kategori)
            ->where('sub_kategori', $project->sub_kategori)
            ->where('id', '!=', $project->id)
            ->where('is_featured', true)
            ->take(3)
            ->get()
            ->map(function ($rp) {
                return [
                    'id' => $rp->id,
                    'title' => $rp->title,
                    'image' => $rp->image,
                    'category' => $rp->categori ? $rp->categori->nama_kategori : null,
                    'sub_kategori' => $rp->sub_kategori,
                    'desc' => $rp->desc,
                ];
            })->toArray();

        // Footer Data
        $footerModel = footer::find(1);
        $work = Banom::all();

        $footerData = [
            'items' => [
                'brandName' => $footerModel->brandName ?? null,
                'brandHighlight' => $footerModel->brandHighlight ?? null,
                'description' => $footerModel->description ?? null,
                'services' => $work,
                'contact' => [
                    'email' => $footerModel->email ?? null,
                    'phone' => $footerModel->whatsapp ?? null,
                    'address' => $footerModel->address ?? null,
                    'whatsappUrl' => $footerModel->whatsappUrl ?? null,
                ],
                'copyright' => $footerModel->copyright ?? null,
                'tagline' => $footerModel->tagline ?? null,
            ],
        ];

        $galery = Galery::where('project_id', $id)->first();
        $galleryImage = GalleryImage::where('galery_id', $galery?->id)->get();

        $data = [
            'id' => $project->id,
            'title' => $project->title,
            'sub_kategori' => $project->sub_kategori,
            'category' => $project->categori ? $project->categori->nama_kategori : null,
            'desc' => $project->desc,
            'image' => $project->image,
            'guest_count' => $project->guest_count,
            'location' => $project->location,
            'preparation_time' => $project->preparation_time,
            'challenge' => $project->challenge,
            'solution' => $project->solution,
            'results' => $project->results,
            'video' => $project->video,
            'is_featured' => $project->is_featured,
            'testimonials' => $project->testimonials->map(function ($t) {
                return [
                    'name' => $t->nama,
                    'image' => $t->image,
                    'event' => $t->event,
                    'review' => $t->review,
                    'role' => $t->jabatan,
                    'rating' => (int) $t->rating,
                ];
            })->toArray(),
            'galleries' => $galleryImage->map(function ($g) {
                return [
                    'image' => $g->image ?? null,
                    'label' => $g->galery->project->title ?? null,
                ];
            })->toArray(),
            'relatedProjects' => $relatedProjects,
            // Di sini kita pastikan data footer menempel di root object data
            'footer' => $footerData,
        ];

        // Gunakan array pembungkus eksplisit untuk Inertia render
        return Inertia::render('detail/DetailPortfolio', [
            'data' => $data,
        ]);
    }
}
