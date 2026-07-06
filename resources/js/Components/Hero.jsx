import { motion } from "framer-motion";

export default function Hero({ data }) {
    const d = data.items[0];
    const grad = `linear-gradient(${d.deg_color ?? "135deg"}, ${d.from_color ?? "#3B7303"} 0%, ${d.via_color ?? "#2d5a02"} 50%, ${d.to_color ?? "#FCA34B"} 100%)`;
    // console.log(d.deg_color)

    return (
        <section
            id="hero"
            aria-label="Hero section"
            className="relative min-h-screen flex items-center justify-center overflow-hidden w-full"
            style={{ background: grad }}
        >
            {/* Grid dot pattern overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
            />

            {/* Animated floating orbs */}
            <motion.div
                className="absolute top-16 left-[8%] w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none"
                animate={{ y: [0, -30, 0], scale: [1, 1.08, 1] }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-24 right-[6%] w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none"
                animate={{ y: [0, 25, 0], scale: [1, 1.05, 1] }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Radial glow behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] aspect-square rounded-full bg-white/8 blur-[100px] pointer-events-none" />

            {/* Decorative diamond shapes */}
            <motion.div
                className="hidden sm:block absolute top-40 right-[4%] w-5 h-5 border border-white/20 rotate-45 pointer-events-none"
                animate={{ rotate: [45, 70, 45], opacity: [0.3, 0.7, 0.3] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="hidden sm:block absolute bottom-32 right-[12%] w-3 h-3 border border-white/15 rotate-45 pointer-events-none"
                animate={{ rotate: [45, 25, 45], opacity: [0.4, 0.8, 0.4] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {d.badge && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/85 text-sm font-medium mb-8 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                    >
                        {d.badge}
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] mb-6 tracking-tight"
                >
                    {d.title}{" "}
                    <span
                        className="bg-clip-text text-transparent bg-gradient-to-r from-soft-yellow via-white to-soft-yellow/80"
                        style={{
                            textShadow: "0 0 40px rgba(253, 253, 150, 0.3)",
                        }}
                    >
                        {d.titleHighlight}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-base sm:text-lg md:text-xl text-white/70 mb-12 max-w-[900px] mx-auto leading-relaxed tracking-wide"
                >
                    {d.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center"
                >
                    <motion.a
                        href="#portfolio"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="group relative overflow-hidden text-center px-9 py-4 rounded-full font-semibold text-base text-white border border-white/30 bg-white/10 backdrop-blur-md transition-all shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:bg-white hover:text-primary hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:border-white"
                    >
                        <span className="relative z-10 group-hover:text-primary transition-colors">
                            Lihat Portofolio
                        </span>
                        <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                    </motion.a>
                    <motion.a
                        href="#cta"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="group relative overflow-hidden text-center px-9 py-4 rounded-full font-semibold text-base text-white/90 border border-white/20 transition-all hover:border-white/50 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        <span className="relative z-10">Hubungi Kami</span>
                        <span className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <svg
                            className="inline-block w-4 h-4 ml-2 -mt-0.5 opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300"
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
                    </motion.a>
                </motion.div>
            </div>

            {d.showScrollIndicator && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-white/40 text-[10px] font-medium tracking-widest uppercase">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-1 h-1.5 rounded-full bg-white/60"
                        />
                    </motion.div>
                </motion.div>
            )}

            {/* Bottom wave divider */}
            <div className="absolute bottom-0 left-0 w-full leading-[0] pointer-events-none">
                <svg
                    viewBox="0 0 1440 120"
                    className="relative block w-full h-[60px] sm:h-[80px]"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="white"
                        d="M0,120L60,112C120,104,240,88,360,80C480,72,600,72,720,80C840,88,960,104,1080,96C1200,88,1320,56,1380,40L1440,24L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
                    />
                </svg>
            </div>
        </section>
    );
}
