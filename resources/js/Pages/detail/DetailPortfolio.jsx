import { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

import Event from "../../../../public/assets/event.webp";
import Design from "../../../../public/assets/design creative.webp";
import Production from "../../../../public/assets/produksi.webp";

const categoryImages = {
    Event: Event,
    Design: Design,
    Production: Production,
};

function SectionTitle({ children }) {
    return (
        <div className="text-center mb-12">
            <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark">
                {children}
            </h2>
        </div>
    );
}

function MetricCard({ icon, label, value }) {
    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
        >
            <div className="text-3xl mb-2">{icon}</div>
            <p className="text-2xl font-bold text-primary-dark">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
        </motion.div>
    );
}

export default function DetailPortfolio(props) {
    // console.log("props =", props);
    // console.log("data =", props?.data);
    const d = props?.data || {};

    const [stickyCta, setStickyCta] = useState(false);
    const heroRef = useRef(null);

    // 2. Amankan semua property array dengan default value array kosong []
    const galleries = d.galleries || [];
    const testimonials = d.testimonials || [];
    const relatedProjects = d.relatedProjects || [];

    // console.log("galleries =", galleries);
    // console.log("testimonials =", testimonials);
    // console.log("relatedProjects =", relatedProjects);
    useEffect(() => {
        const onScroll = () => {
            if (heroRef.current) {
                setStickyCta(window.scrollY > heroRef.current.offsetHeight);
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const coverImage = d.image
        ? `/storage/${d.image}`
        : categoryImages[d.category] || Design;

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <Head>
                <title>{d?.title || "Relate House"}</title>

                <meta
                    name="description"
                    content={d?.desc || "Detail project Relate House"}
                />

                <meta
                    property="og:title"
                    content={`${d?.title || "Relate House"} - Relate House`}
                />

                <meta
                    property="og:description"
                    content={d?.desc || "Detail project Relate House"}
                />

                {coverImage ? (
                    <meta property="og:image" content={coverImage} />
                ) : null}
            </Head>

            {/* <a href="/"> */}
                <Navbar />
            {/* </a> */}

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-[70vh] flex items-center pt-20 pb-12 overflow-hidden pt-[120px]"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-dark/95 to-accent/80" />
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                                    {d.category}
                                </span>
                                {d.sub_kategori && (
                                    <span className="text-xs font-semibold bg-accent/30 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                                        {d.sub_kategori}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                                {d.title}
                            </h1>
                            <p className="text-white/80 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
                                {d.desc}
                            </p>
                            <a
                                href="#cta-portfolio"
                                className="mt-6 inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-dark transition-colors shadow-xl"
                            >
                                Buat Acara Serupa
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <img
                                    src={coverImage}
                                    alt={d.title}
                                    loading="eager"
                                    // fetchPriority="high"
                                    decoding="async"
                                    className="w-full aspect-[4/3] object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Quick Metrics */}
                {(d.guest_count || d.location || d.preparation_time) && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 -mt-10 relative z-10 mb-16"
                    >
                        {d.guest_count && (
                            <motion.div variants={fadeUp}>
                                <MetricCard
                                    icon="👥"
                                    label="Jumlah Tamu"
                                    value={d.guest_count}
                                />
                            </motion.div>
                        )}
                        {d.location && (
                            <motion.div variants={fadeUp}>
                                <MetricCard
                                    icon="📍"
                                    label="Lokasi"
                                    value={d.location}
                                />
                            </motion.div>
                        )}
                        {d.preparation_time && (
                            <motion.div variants={fadeUp}>
                                <MetricCard
                                    icon="⏱️"
                                    label="Lama Persiapan"
                                    value={d.preparation_time}
                                />
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Results Section */}
                {d.results && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="py-16"
                    >
                        <SectionTitle>
                            Hasil & <span className="text-primary">Dampak</span>
                        </SectionTitle>
                        <motion.div
                            variants={fadeUp}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 flex gap-5 items-start">
                                <div className="text-4xl flex-shrink-0">🏆</div>
                                <div>
                                    <h3 className="text-xl font-bold text-primary-dark mb-3">
                                        The Results
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-justify">
                                        {d.results}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.section>
                )}

                {/* Challenge Section */}
                {/* {d.challenge && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="py-16"
                    >
                        <SectionTitle>
                            Tantangan{" "}
                            <span className="text-primary">Klien</span>
                        </SectionTitle>
                        <motion.div
                            variants={fadeUp}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 flex gap-5 items-start">
                                <div className="text-4xl flex-shrink-0">💪</div>
                                <div>
                                    <h3 className="text-xl font-bold text-primary-dark mb-3">
                                        The Problem
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {d.challenge}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.section>
                )} */}

                {/* Solution Section */}
                {/* {d.solution && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="py-16"
                    >
                        <SectionTitle>
                            Solusi <span className="text-primary">Kreatif</span>
                        </SectionTitle>
                        <motion.div
                            variants={fadeUp}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 flex gap-5 items-start">
                                <div className="text-4xl flex-shrink-0">✨</div>
                                <div>
                                    <h3 className="text-xl font-bold text-primary-dark mb-3">
                                        The Solution
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {d.solution}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.section>
                )} */}

                {/* Gallery Section */}
                {galleries.length > 0 && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="py-16"
                    >
                        <SectionTitle>
                            Galeri <span className="text-primary">Acara</span>
                        </SectionTitle>

                        <motion.div
                            variants={stagger}
                            className={`grid ${galleries.length < 2 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"} justify-items-center gap-6`}
                        >
                            {galleries.map((g, i) => (
                                <motion.div
                                    key={g.id ?? i}
                                    variants={fadeUp}
                                    whileTap={{ scale: 0.98 }}
                                    className={`${i === 0 ? "lg:col-span-2" : ""} ${i === 5 ? "lg:col-span-2" : ""} ${i === 6 ? "lg:col-span-2" : ""} ${i === 11 ? "lg:col-span-2" : ""} h-[300px] w-full group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300`}
                                >
                                    {g.image ? (
                                        <img
                                            src={`/storage/${g.image}`}
                                            alt={g.label || `Gallery ${i + 1}`}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            Tidak ada gambar
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>
                )}

                {/* Video Section */}
                {d.video && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="py-16"
                    >
                        <SectionTitle>
                            Video{" "}
                            <span className="text-primary">Highlight</span>
                        </SectionTitle>
                        <motion.div
                            variants={fadeUp}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
                                <video
                                    src={`/storage/${d.video}`}
                                    className="w-full aspect-video object-cover"
                                    controls
                                    autoPlay
                                    poster={coverImage}
                                />
                            </div>
                        </motion.div>
                    </motion.section>
                )}

                {/* Testimonials Section */}
                {testimonials.length > 0 && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="py-16"
                    >
                        <SectionTitle>
                            Testimoni{" "}
                            <span className="text-primary">Klien</span>
                        </SectionTitle>
                        <div
                            className={`${testimonials.length < 2 ? "flex items-center justify-center" : "grid sm:grid-cols-2"} gap-6 max-w-[782px] mx-auto`}
                        >
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                                            {t.name?.charAt(0) || "?"}
                                        </div>
                                        <div>
                                            <p className="font-bold text-primary-dark">
                                                {t.name}
                                            </p>
                                            {t.role && (
                                                <p className="text-sm text-gray-500">
                                                    {t.role}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mb-3">
                                        {Array.from({
                                            length: t.rating || 5,
                                        }).map((_, r) => (
                                            <svg
                                                key={r}
                                                className="w-4 h-4 text-yellow-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <blockquote className="text-gray-600 italic leading-relaxed text-sm">
                                        "{t.review}"
                                    </blockquote>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Related Projects Section */}
                {relatedProjects.length > 0 && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="py-16"
                    >
                        <SectionTitle>
                            Konsep <span className="text-primary">Serupa</span>
                        </SectionTitle>
                        <motion.div
                            variants={stagger}
                            className={`${relatedProjects.length <= 2 ? "flex flex-col sm:flex-row items-center justify-center" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"} gap-6`}
                        >
                            {relatedProjects.map((rp) => {
                                const rpImage = rp.image
                                    ? `/storage/${rp.image}`
                                    : categoryImages[rp.category] || Design;
                                return (
                                    <motion.div key={rp.id} variants={fadeUp}>
                                        <Link
                                            href={`/detail/portfolio/${rp.id}`}
                                            className="block group"
                                        >
                                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-w-[375px]">
                                                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                                                    <img
                                                        src={rpImage}
                                                        alt={rp.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="p-5">
                                                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                        {rp.category}
                                                    </span>
                                                    <div className="my-2 flex flex-col">
                                                        <span className="font-bold text-primary-dark mt-3 mb-2 me-2">
                                                            {rp.title}
                                                        </span>
                                                        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full max-w-max">
                                                            {rp.sub_kategori}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 text-justify">
                                                        {rp.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.section>
                )}

                {/* CTA Section */}
                <section id="cta-portfolio" className="py-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="relative rounded-2xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-accent" />
                        <div className="relative p-10 sm:p-14 text-center">
                            <motion.h2
                                variants={fadeUp}
                                className="text-2xl sm:text-4xl font-bold text-white mb-4"
                            >
                                Ingin Buat Acara Seperti Ini?
                            </motion.h2>
                            <motion.p
                                variants={fadeUp}
                                className="text-white/80 max-w-xl mx-auto mb-8"
                            >
                                Konsultasikan kebutuhan acara Anda dengan tim
                                kami. Gratis!
                            </motion.p>
                            <motion.div
                                variants={fadeUp}
                                className="flex flex-wrap justify-center gap-4"
                            >
                                <a
                                    href="https://wa.me/6281242611972"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-full font-bold hover:bg-accent-dark transition-colors shadow-xl text-lg"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Konsultasi Gratis
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            </div>

            <Footer data={d.footer} />

            {/* Sticky CTA */}
            <AnimatePresence>
                {stickyCta && (
                    <motion.a
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        href="https://wa.me/6281242611972"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-accent text-white px-5 py-3 rounded-full shadow-2xl font-semibold hover:bg-accent-dark transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span className="hidden sm:inline">
                            Konsultasi Gratis
                        </span>
                    </motion.a>
                )}
            </AnimatePresence>
        </>
    );
}
