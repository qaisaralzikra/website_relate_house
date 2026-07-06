import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WhyChooseUs({ data }) {
    const d = data.items;
    const ref = useRef(null);
    const visible = useInView(ref, { once: true, margin: "-100px" });

    const gradient = {
        from: "#3B7303",
        via: "#4a8f04",
        to: "#FDFD96",
        angle: "135deg",
    };

    const grad = `linear-gradient(${gradient.angle || "135deg"}, ${gradient.from} 0%, ${gradient.via} 50%, ${gradient.to} 100%)`;

    return (
        <section
            id="why"
            aria-label="Alasan memilih kami"
            className="py-20 lg:py-28 relative overflow-hidden"
            style={{ background: grad }}
        >
            {/* Dot grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Animated orbs */}
            <motion.div
                className="absolute top-16 -left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none"
                animate={{ y: [0, -25, 0], scale: [1, 1.06, 1] }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-16 -right-10 w-80 h-80 rounded-full bg-soft-yellow/8 blur-3xl pointer-events-none"
                animate={{ y: [0, 20, 0], scale: [1, 1.04, 1] }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={visible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/85 text-sm font-medium mb-6 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                    >
                        Why Us
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        animate={visible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white"
                        style={{ textShadow: "0 2px 16px rgba(0,0,0,0.3)" }}
                    >
                        Kenapa Memilih{" "}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-[#fdfd96] to-white filter drop-shadow-md"
                            style={{}} // Kosongkan textShadow di sini
                        >
                            Relate?
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
                        <span className="block w-12 h-1 rounded-full bg-soft-yellow" />
                        <span className="block w-3 h-3 rounded-full bg-white" />
                        <span className="block w-20 h-0.5 rounded-full bg-white/40" />
                    </motion.div>
                </div>

                {/* Items grid */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={visible ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.08 },
                        },
                    }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
                >
                    {d.map((reason, i) => {
                        const label =
                            typeof reason === "string" ? reason : reason.label;
                        const num = String(i + 1).padStart(2, "0");

                        return (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                whileHover={{ y: -6 }}
                                whileTap={{ scale: 0.97 }}
                                className="group relative bg-white/10 backdrop-blur-md rounded-xl px-5 py-5 border border-white/15 hover:border-white/30 transition-all duration-300 overflow-hidden"
                            >
                                {/* Number badge */}
                                <span className="font-mono text-3xl font-bold text-white/10 absolute top-2 left-4 group-hover:text-white/20 transition-colors duration-300 select-none">
                                    {num}
                                </span>

                                {/* Check icon — bottom-right */}
                                <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-soft-yellow flex items-center justify-center group-hover:scale-110 group-hover:rotate-[-8deg] transition-all duration-300">
                                    <svg
                                        aria-hidden="true"
                                        className="w-4 h-4 text-primary-dark"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>

                                {/* Label */}
                                <span className="text-white font-semibold text-base lg:text-lg pr-8">
                                    {label}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
