import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

import event from "../../../public/assets/event.webp";

const starVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { delay: i * 0.08, type: "spring", stiffness: 200 },
    }),
};

export default function Testimonials({ data }) {
    const d = data;
    const [current, setCurrent] = useState(0);
    const ref = useRef(null);
    const visible = useInView(ref, { once: true, margin: "-100px" });

    const next = () => setCurrent((c) => (c + 1) % d.items.length);
    const prev = () =>
        setCurrent((c) => (c - 1 + d.items.length) % d.items.length);

    const t = d.items[current];

    return (
        <section
            id="testimonials"
            aria-label="Testimonial"
            className="py-20 lg:py-28 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, #FDFD96 0%, #fef0d6 100%)` }}
        >
            {/* Dot grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#3B7303_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

            {/* Floating orbs */}
            <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/[0.06] rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-20 -right-20 w-80 h-80 bg-accent/[0.06] rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-soft-yellow/[0.05] rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: "4s" }} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="inline-block px-4 py-1.5 bg-white/40 backdrop-blur-sm rounded-full text-primary text-xs font-semibold tracking-wider uppercase border border-white/20"
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mt-4"
                    >
                        <span className="text-primary-dark">Apa Kata </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-soft-yellow">
                            Mereka
                        </span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                        className="flex items-center justify-center gap-2 mt-4 origin-center"
                    >
                        <span className="block w-12 h-1 rounded-full bg-accent" />
                        <span className="block w-3 h-3 rounded-full bg-primary" />
                        <span className="block w-20 h-0.5 rounded-full bg-primary/30" />
                    </motion.div>
                </motion.div>

                {/* Carousel */}
                <div
                    ref={ref}
                    className={`relative ${visible ? "animate-fade-in-up" : "opacity-0"}`}
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(_, { offset, velocity }) => {
                            if (offset.x < -100 || velocity.x < -500) next();
                            if (offset.x > 100 || velocity.x > 500) prev();
                        }}
                        whileTap={{ cursor: "grabbing" }}
                        className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-white/30"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -60 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative"
                            >
                                {/* Decorative quote */}
                                <div className="absolute -top-4 -left-2 text-6xl sm:text-7xl text-accent/[0.08] leading-none select-none pointer-events-none font-serif">
                                    &ldquo;
                                </div>

                                <div className="flex flex-col sm:flex-row items-start gap-6">
                                    <div className="flex-1 relative z-10">
                                        {/* Rating Stars */}
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            className="flex items-center gap-1 mb-4"
                                        >
                                            {[...Array(Number(t.rating) || 5)].map((_, i) => (
                                                <motion.svg
                                                    key={i}
                                                    custom={i}
                                                    variants={starVariants}
                                                    aria-hidden="true"
                                                    className="w-5 h-5 text-accent"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </motion.svg>
                                            ))}
                                        </motion.div>

                                        {/* Review text */}
                                        <p className="text-gray-600 leading-relaxed text-base sm:text-lg lg:text-xl italic relative z-10">
                                            &ldquo;{t.review}&rdquo;
                                        </p>

                                        {/* Author */}
                                        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/30">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                                whileHover={{ scale: 1.05 }}
                                                className="relative"
                                            >
                                                {t.image ? (
                                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-accent/30 ring-offset-4 ring-offset-transparent shadow-lg">
                                                        <img
                                                            src={`storage/${t.image}`}
                                                            alt={t.name}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-accent/30 ring-offset-4 ring-offset-transparent shadow-lg">
                                                        <img
                                                            src={event}
                                                            alt={t.name}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </motion.div>

                                            <div>
                                                <h4 className="font-bold text-primary-dark text-base sm:text-lg">
                                                    {t.name}
                                                </h4>
                                                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-0.5">
                                                    <span className="text-xs bg-accent/10 text-accent-dark px-2.5 py-0.5 rounded-full font-medium border border-accent/10">
                                                        {t.event}
                                                    </span>
                                                    <span>— {t.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <motion.button
                            onClick={prev}
                            whileHover={{ scale: 1.1, x: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl flex items-center justify-center transition-all border border-white/30 hover:bg-accent hover:text-white group"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-primary transition-colors group-hover:text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </motion.button>

                        <div className="flex gap-2">
                            {d.items.map((_, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    whileTap={{ scale: 0.9 }}
                                    layout
                                    className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-8" : "bg-gray-300 w-2.5"}`}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={next}
                            whileHover={{ scale: 1.1, x: 2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl flex items-center justify-center transition-all border border-white/30 hover:bg-accent hover:text-white group"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-primary transition-colors group-hover:text-white"
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
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
