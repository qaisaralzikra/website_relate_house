import { motion } from "framer-motion";
import { useState, lazy, Suspense } from "react";
import { router } from "@inertiajs/react";
import Hero from "../../components/Hero.jsx";
import About from "../../components/About.jsx";
import Services from "../../components/Services.jsx";
import Portfolio from "../../components/Portfolio.jsx";
import WhyChooseUs from "../../components/WhyChooseUs.jsx";
import Statistics from "../../components/Statistics.jsx";
import Partners from "../../components/Partners.jsx";
import Testimonials from "../../components/Testimonials.jsx";
import Gallery from "../../components/Gallery.jsx";
import Workflow from "../../components/Workflow.jsx";
import CtaSection from "../../components/CtaSection.jsx";
import Footer from "../../components/Footer.jsx";
import DetailService from "../Detail/DetailService.jsx";
import PriceList from "../Detail/PriceList.jsx";

const Dashboard = lazy(() => import("./Dashboard.jsx"));

const modals = {
    heroData: lazy(() => import("./modals/HeroModal.jsx")),
    aboutData: lazy(() => import("./modals/AboutModal.jsx")),
    servicesData: lazy(() => import("./modals/ServicesModal.jsx")),
    portfolioData: lazy(() => import("./modals/PortfolioModal.jsx")),
    whyChooseUs: lazy(() => import("./modals/WhyChooseUsModal.jsx")),
    statisticsData: lazy(() => import("./modals/StatisticsModal.jsx")),
    partner: lazy(() => import("./modals/PartnersModal.jsx")),
    testimoni: lazy(() => import("./modals/TestimonialsModal.jsx")),
    galery: lazy(() => import("./modals/GalleryModal.jsx")),
    workflow: lazy(() => import("./modals/WorkflowModal.jsx")),
    ctaData: lazy(() => import("./modals/CtaModal.jsx")),
    footer: lazy(() => import("./modals/FooterModal.jsx")),
    priceData: lazy(() => import("./modals/PriceModal.jsx")),
};

const sections = [{ key: "dashboard", label: "Dashboard", icon: "📊" }];

const navItems = [
    { key: "heroData", label: "Hero", icon: "🎯" },
    { key: "aboutData", label: "About", icon: "📖" },
    { key: "servicesData", label: "Services", icon: "⚙️" },
    { key: "portfolioData", label: "Portfolio", icon: "🖼️" },
    { key: "whyChooseUs", label: "Why Us", icon: "✅" },
    { key: "statisticsData", label: "Statistics", icon: "📊" },
    { key: "partner", label: "Partners", icon: "🤝" },
    { key: "testimoni", label: "Testimoni", icon: "💬" },
    { key: "galery", label: "Gallery", icon: "📸" },
    { key: "workflow", label: "Workflow", icon: "🔄" },
    { key: "ctaData", label: "CTA", icon: "🚀" },
    { key: "priceData", label: "Price", icon: "💰" },
    { key: "footer", label: "Footer", icon: "📞" },
];

// 1. UBAH DI SINI: Bongkar props langsung agar React mendeteksi perubahan data secara reaktif
export default function AdminLayout({
    heroData,
    aboutData,
    servicesData,
    portfolioData,
    whyChooseUs,
    statisticsData,
    partner,
    testimoni,
    galery,
    workflow,
    ctaData,
    footer,
    visitorStats,
    priceData,
    ...restProps
}) {
    const [page, setPage] = useState("dashboard");
    const [modal, setModal] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [galleryMode, setGalleryMode] = useState("create");
    const [galleryEditItem, setGalleryEditItem] = useState(null);

    // Kumpulkan kembali ke objek untuk mempermudah pemanggilan modal dinamis secara aman
    const allData = {
        heroData,
        aboutData,
        servicesData,
        portfolioData,
        whyChooseUs,
        statisticsData,
        partner,
        testimoni,
        galery,
        workflow,
        ctaData,
        footer,
        priceData,
    };

    const openModal = (key) => setModal(key);
    const closeModal = () => setModal(null);

    const handleSave = (sectionKey, newData) => {
        if (sectionKey === "galery") {
            return handleGallerySave(newData);
        }
        return new Promise((resolve, reject) => {
            router.post(`/admin/section/${sectionKey}`, newData, {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    closeModal();
                    resolve();
                },
                onError: (errors) => {
                    reject(new Error(Object.values(errors).join(", ")));
                },
            });
        });
    };

    const handleGallerySave = (formData) => {
        return new Promise((resolve, reject) => {
            const url =
                galleryMode === "edit" && galleryEditItem?.id
                    ? `/admin/gallery/update/${galleryEditItem.id}`
                    : "/admin/gallery/store";
            router.post(url, formData, {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    closeModal();
                    setGalleryEditItem(null);
                    resolve();
                },
                onError: (errors) => {
                    reject(new Error(Object.values(errors).join(", ")));
                },
            });
        });
    };

    const handleGalleryDelete = (id) => {
        return new Promise((resolve, reject) => {
            router.post(
                `/admin/gallery/delete/${id}`,
                {},
                {
                    preserveScroll: true,
                    preserveState: false,
                    onSuccess: () => {
                        closeModal();
                        setGalleryEditItem(null);
                        resolve();
                    },
                    onError: (errors) => {
                        reject(new Error(Object.values(errors).join(", ")));
                    },
                },
            );
        });
    };

    const scrollToSection = (key) => {
        const el = document.getElementById(`admin-preview-${key}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const ModalComponent = modal ? modals[modal] : null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 overflow-y-auto`}
            >
                <div className="p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-primary-dark">
                        Relate<span className="text-accent">Admin</span>
                    </h2>
                </div>
                <nav className="p-3 space-y-1">
                    {sections.map((item) => (
                        <motion.button
                            key={item.key}
                            onClick={() => {
                                setPage(item.key);
                                setSidebarOpen(false);
                                if (item.key !== "dashboard")
                                    scrollToSection(item.key);
                            }}
                            whileTap={{ scale: 0.97 }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${page === item.key ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </motion.button>
                    ))}

                    <h1 className="px-3 py-2.5 text-sm text-gray-600">Menu</h1>

                    {navItems.map((item) => (
                        <motion.button
                            key={item.key}
                            onClick={() => {
                                setPage(item.key);
                                setSidebarOpen(false);
                                if (item.key !== "dashboard")
                                    scrollToSection(item.key);
                            }}
                            whileTap={{ scale: 0.97 }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${page === item.key ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </motion.button>
                    ))}
                </nav>
                <div className="p-3 border-t border-gray-100 mt-4">
                    <motion.button
                        onClick={() => router.post("/logout")} // Perbaikan di sini: gunakan tanda kurung, bukan sama dengan
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v-4a4 4 0 00-4-4H5"
                            />
                        </svg>
                        Keluar
                    </motion.button>
                </div>
            </aside>

            <div className="flex-1 min-w-0">
                <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            whileTap={{ scale: 0.95 }}
                            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100"
                        >
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </motion.button>
                        <h1 className="text-sm font-semibold text-gray-700 capitalize">
                            {page === "dashboard"
                                ? "Dashboard"
                                : `Editing: ${page}`}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 hover:text-primary flex items-center gap-1"
                        >
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                            Lihat Website
                        </a>
                    </div>
                </header>

                <main>
                    <Suspense
                        fallback={
                            <div className="p-8 text-center text-gray-400">
                                Memuat...
                            </div>
                        }
                    >
                        {page === "dashboard" ? (
                            <Dashboard visitorStats={visitorStats} />
                        ) : (
                            <div className="p-4 lg:p-6">
                                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="font-semibold text-primary-dark capitalize">
                                            {page} Section
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            Klik "Edit Section" untuk mengubah
                                            konten
                                        </p>
                                    </div>
                                    {page === "galery" ? (
                                        <motion.button
                                            onClick={() => {
                                                setGalleryMode("create");
                                                setGalleryEditItem(null);
                                                openModal(page);
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors shadow-lg shadow-primary/20"
                                        >
                                            Create Section
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            onClick={() => openModal(page)}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors shadow-lg shadow-primary/20"
                                        >
                                            Edit Section
                                        </motion.button>
                                    )}
                                </div>
                                <div
                                    id={`admin-preview-${page}`}
                                    className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                                >
                                    <div className="text-xs text-gray-500 px-4 py-2 bg-gray-50 border-b border-gray-200 font-medium flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500" />
                                        <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        Live Preview
                                    </div>

                                    {/* 2. UBAH DI SINI: Berikan key={page} agar element me-render ulang data baru secara total */}
                                    <div
                                        key={page}
                                        className={`[&_#hero]:!min-h-0 [&_#hero]:!py-16 ${page === "workflow" ? "pt-[20px] lg:pt-[28px]" : ""}`}
                                    >
                                        {page === "heroData" && (
                                            <Hero data={heroData} />
                                        )}
                                        {page === "aboutData" && (
                                            <About data={aboutData} />
                                        )}
                                        {page === "servicesData" && (
                                            <Services data={servicesData} />
                                        )}
                                        {page === "portfolioData" && (
                                            <Portfolio data={portfolioData} />
                                        )}
                                        {page === "whyChooseUs" && (
                                            <WhyChooseUs data={whyChooseUs} />
                                        )}
                                        {page === "statisticsData" && (
                                            <Statistics data={statisticsData} />
                                        )}
                                        {page === "partner" && (
                                            <Partners data={partner} />
                                        )}
                                        {page === "testimoni" && (
                                            <Testimonials data={testimoni} />
                                        )}
                                        {page === "galery" && (
                                            <Gallery
                                                data={galery}
                                                onItemClick={(item) => {
                                                    setGalleryMode("edit");
                                                    setGalleryEditItem(item);
                                                    openModal("galery");
                                                }}
                                            />
                                        )}
                                        {page === "workflow" && (
                                            <Workflow data={workflow} />
                                        )}
                                        {page === "ctaData" && (
                                            <CtaSection data={ctaData} />
                                        )}
                                        {page === "priceData" && (
                                            <PriceList data={priceData} />
                                        )}
                                        {page === "footer" && (
                                            <Footer data={footer} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Suspense>
                </main>
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {ModalComponent && (
                <ModalComponent
                    data={allData[modal]}
                    onSave={(newData) => handleSave(modal, newData)}
                    onClose={closeModal}
                    {...(modal === "galery"
                        ? {
                              mode: galleryMode,
                              editItem: galleryEditItem,
                              onDelete: handleGalleryDelete,
                          }
                        : {})}
                />
            )}
        </div>
    );
}
