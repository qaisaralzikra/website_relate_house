import { motion } from "framer-motion";
import useOnScreen from "../hooks/useOnScreen.jsx";

export default function Workflow({ data }) {
    const d = data;
    const [ref, visible] = useOnScreen();

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
    };

    const slideIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <section
            id="workflow"
            aria-label="Alur kerja"
            className="py-20 lg:py-28 bg-white relative overflow-hidden"
        >
            {/* Subtle orbs */}
            <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 -right-20 w-80 h-80 bg-accent/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
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
                        className="inline-block px-4 py-1.5 bg-primary/5 backdrop-blur-sm rounded-full text-primary text-xs font-semibold tracking-wider uppercase border border-primary/10"
                    >
                        How We Work
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mt-4"
                    >
                        <span className="text-primary-dark">Alur Kerja </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-soft-yellow">
                            Kami
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

                {/* Timeline */}
                <div
                    ref={ref}
                    className={`relative ${visible ? "animate-fade-in-up" : "opacity-0"}`}
                >
                    {/* Desktop: Alternating Timeline */}
                    <motion.div
                        initial="hidden"
                        animate={visible ? "visible" : "hidden"}
                        variants={stagger}
                        className="hidden sm:block relative"
                    >
                        {/* Center line */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={visible ? { scaleY: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary-dark origin-top"
                            style={{ boxShadow: "0 0 12px rgba(59, 115, 3, 0.15)" }}
                        />

                        {d.items.map((s, i) => (
                            <motion.div
                                key={i}
                                variants={slideIn}
                                className={`flex items-center w-full ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} relative mb-20 last:mb-0`}
                            >
                                {/* Card */}
                                <div className={`w-[calc(50%-32px)] ${i % 2 === 0 ? "text-right pr-10" : "text-left pl-10"}`}>
                                    <motion.div
                                        whileHover={{ y: -6, scale: 1.01 }}
                                        className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-accent relative overflow-hidden"
                                    >
                                        {/* Icon background */}
                                        <div className="absolute -top-4 -right-4 text-5xl opacity-[0.06] pointer-events-none select-none group-hover:scale-110 group-hover:opacity-[0.1] transition-all duration-500">
                                            {s.icon || "📋"}
                                        </div>

                                        {/* Icon + Title row */}
                                        <div className={`flex items-start gap-3 ${i % 2 === 0 ? "flex-row-reverse" : ""}`}>
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-soft-yellow/20 flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-300">
                                                {s.icon || "📋"}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-primary-dark">
                                                    {s.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <p className={`text-gray-500 text-sm leading-relaxed mt-3 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                                            {s.desc}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Step circle */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={visible ? { scale: 1 } : {}}
                                    transition={{ delay: i * 0.18 + 0.3, type: "spring", stiffness: 250, damping: 15 }}
                                    whileHover={{ scale: 1.15 }}
                                    className="absolute left-1/2 -translate-x-1/2 z-10"
                                >
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-4 ring-white shadow-lg">
                                            <span className="text-white font-bold text-sm">{s.step}</span>
                                        </div>
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                                            className="absolute inset-0 rounded-full bg-primary/20 -z-10"
                                        />
                                    </div>
                                </motion.div>

                                {/* Spacer */}
                                <div className="w-[calc(50%-32px)]" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Mobile: Vertical Timeline */}
                    <motion.div
                        initial="hidden"
                        animate={visible ? "visible" : "hidden"}
                        variants={stagger}
                        className="sm:hidden relative"
                    >
                        {/* Line */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={visible ? { scaleY: 1 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary-dark origin-top"
                        />

                        {d.items.map((s, i) => (
                            <motion.div
                                key={i}
                                variants={slideIn}
                                className="relative pl-16 pb-10 last:pb-0"
                            >
                                {/* Step circle */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={visible ? { scale: 1 } : {}}
                                    transition={{ delay: i * 0.18 + 0.3, type: "spring", stiffness: 250 }}
                                    className="absolute left-6 -translate-x-1/2 z-10"
                                >
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-4 ring-white shadow-md">
                                        <span className="text-white font-bold text-xs">{s.step}</span>
                                    </div>
                                </motion.div>

                                {/* Card */}
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-2xl p-5 shadow-md border-l-4 border-accent"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-soft-yellow/20 flex items-center justify-center text-lg">
                                            {s.icon || "📋"}
                                        </div>
                                        <h3 className="text-base font-bold text-primary-dark">
                                            {s.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-xs leading-relaxed">
                                        {s.desc}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
