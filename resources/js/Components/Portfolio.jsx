import { Link } from "@inertiajs/react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

import Event from "../../../public/assets/event.webp";
import Design from "../../../public/assets/design creative.webp";
import Production from "../../../public/assets/produksi.webp";

export default function Portfolio({ data }) {
    const d = data;
    const [active, setActive] = useState("Event");
    const ref = useRef(null);
    const visible = useInView(ref, { once: true, margin: "-100px" });

    const categoryImages = {
        Event: Event,
        Design: Design,
        Production: Production,
    };

    const filtered =
        active === "All"
            ? d.items
            : d.items.filter((p) => p.category === active);

    return (
        <section
            id="portfolio"
            aria-label="Portfolio"
            className="py-20 lg:py-28 bg-white relative overflow-hidden"
        >
            {/* Subtle background orbs */}
            <div className="absolute top-40 -left-20 w-80 h-80 bg-primary/[0.015] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={visible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 bg-primary/5 backdrop-blur-sm rounded-full text-primary text-xs font-semibold tracking-wider uppercase border border-primary/10"
                    >
                        Our Works
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        animate={visible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mt-4"
                    >
                        <span className="text-primary-dark">Portfolio </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-soft-yellow">
                            Kami
                        </span>
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={visible ? { scaleX: 1 } : {}}
                        transition={{
                            duration: 0.6,
                            delay: 0.25,
                            ease: "easeOut",
                        }}
                        className="flex items-center justify-center gap-2 mt-4 origin-center"
                    >
                        <span className="block w-12 h-1 rounded-full bg-accent" />
                        <span className="block w-3 h-3 rounded-full bg-primary" />
                        <span className="block w-20 h-0.5 rounded-full bg-primary/30" />
                    </motion.div>
                </div>

                {/* Category tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="flex flex-wrap justify-center gap-1 mb-12"
                >
                    {d.cat.map((cat) => (
                        <motion.button
                            key={cat.category}
                            onClick={() => setActive(cat.category)}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                active === cat.category
                                    ? "text-white"
                                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                            {active === cat.category && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                    }}
                                />
                            )}
                            <span className="relative z-10">
                                {cat.category}
                            </span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Portfolio grid */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={visible ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 },
                        },
                    }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered && filtered.length > 0 ? (
                            filtered.map((item) => {
                                const currentImage = item.image
                                    ? `/storage/${item.image}`
                                    : categoryImages[item.category] || Design;

                                return (
                                    <Link href={`/detail/portfolio/${item.id}`}>
                                        <motion.div
                                            key={item.id}
                                            layout
                                            variants={{
                                                hidden: {
                                                    opacity: 0,
                                                    y: 30,
                                                    scale: 0.95,
                                                },
                                                visible: {
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                },
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -20,
                                                scale: 0.95,
                                            }}
                                            transition={{ duration: 0.4 }}
                                            whileHover={{ y: -6 }}
                                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ring-1 ring-gray-100 hover:ring-accent/30"
                                        >
                                            {/* Image section */}
                                            <div className="aspect-[4/3] relative overflow-hidden">
                                                <img
                                                    src={currentImage}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                />

                                                {/* Dark overlay on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />

                                                {/* Category badge overlay */}
                                                <div className="absolute top-3 left-3">
                                                    <span className="inline-block px-3 py-1 text-[11px] font-semibold bg-white/90 backdrop-blur-sm text-primary-dark rounded-full shadow">
                                                        {item.category}
                                                    </span>
                                                </div>

                                                {/* Hover center text */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    <span className="text-white text-sm font-semibold bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                        Lihat Detail
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content section */}
                                            <div className="p-5">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                                                        {item.sub_kategori}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-primary-dark text-base leading-snug mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                                    {item.desc}
                                                </p>
                                                <Link
                                                    href={`/detail/portfolio/${item.id}`}
                                                    className="mt-4 text-sm font-semibold text-accent hover:text-accent-dark transition-colors inline-flex items-center gap-1.5 group/link"
                                                >
                                                    <span>Lihat Detail</span>
                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </Link>
                                );
                            })
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-16 text-center"
                            >
                                <div className="inline-flex flex-col items-center gap-3 text-gray-300">
                                    <svg
                                        className="w-12 h-12"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                    <span className="text-sm font-medium">
                                        Tidak ada portfolio di kategori ini
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
