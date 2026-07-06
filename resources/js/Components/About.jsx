import { motion } from "framer-motion";
import useOnScreen from "../hooks/useOnScreen.jsx";
import Team from "../../../public/assets/team.webp";

export default function About({ data }) {
    const d = data.items[0];
    const s = data.itemss;

    const [ref, visible] = useOnScreen();

    return (
        <section id="about" aria-label="Tentang kami" className="relative py-20 lg:py-28 bg-white overflow-hidden">
            {/* Subtle background orbs */}
            <div className="absolute top-40 -left-20 w-80 h-80 bg-primary/[0.015] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left column — text */}
                    <div ref={ref} className="space-y-6">
                        {visible && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-block px-4 py-1.5 bg-primary/5 backdrop-blur-sm rounded-full text-primary text-xs font-semibold tracking-wider uppercase border border-primary/10"
                                >
                                    Tentang Kami
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]"
                                >
                                    <span className="text-primary-dark">{d.title} </span>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-soft-yellow">
                                        {d.titleHighlight}
                                    </span>
                                </motion.h2>

                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                                    className="flex items-center gap-2 origin-left"
                                >
                                    <span className="block w-12 h-1 rounded-full bg-accent" />
                                    <span className="block w-3 h-3 rounded-full bg-primary" />
                                    <span className="block w-20 h-0.5 rounded-full bg-primary/30" />
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.35 }}
                                    className="text-gray-600 leading-8 text-base lg:text-lg text-justify"
                                >
                                    <span className="text-accent font-bold mr-1.5">▸</span>
                                    {d.desc_1}
                                </motion.p>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="text-gray-600 leading-8 text-base lg:text-lg text-justify"
                                >
                                    <span className="text-accent font-bold mr-1.5">▸</span>
                                    {d.desc_2}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.65 }}
                                >
                                    <motion.a
                                        href="#cta"
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-primary text-white hover:bg-primary-light transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Hubungi Kami
                                        <svg
                                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </motion.a>
                                </motion.div>
                            </>
                        )}
                    </div>

                    {/* Right column — image */}
                    <div className="relative">
                        {visible && (
                            <>
                                {/* Floating decorations behind image */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="absolute -top-4 -left-4 w-28 h-28 border border-accent/20 rounded-full pointer-events-none"
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                    className="absolute top-[12%] -right-[6%] w-4 h-4 border border-primary/30 rotate-45 pointer-events-none"
                                />

                                {/* Image wrapper */}
                                <motion.div
                                    initial={{ opacity: 0, x: 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                                    className="relative group"
                                >
                                    <div className="aspect-[4/2.4] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-accent/20 ring-offset-4 ring-offset-white">
                                        {d.image ? (
                                            <img
                                                src={`storage/${d.image}`}
                                                alt="About"
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                            />
                                        ) : (
                                            <img
                                                src={Team}
                                                alt="About"
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                            />
                                        )}

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                            <span className="text-white text-sm font-semibold tracking-wide bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                                                Relate Organize
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Stats card overlay */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                                    className="absolute -bottom-4 -right-2 sm:right-4 bg-white/90 backdrop-blur-md rounded-xl px-5 py-3.5 shadow-xl border border-white/50 flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-soft-yellow flex items-center justify-center text-primary-dark font-bold text-sm">
                                        {s.value}{s.suffix}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Event Completed</p>
                                        <p className="text-sm font-bold text-primary-dark">Years Experience</p>
                                    </div>
                                </motion.div>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
}
