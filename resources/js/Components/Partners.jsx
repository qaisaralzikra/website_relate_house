import { motion } from 'framer-motion'

import logo from '../../../public/assets/partner.webp'

export default function Partners({ data }) {
    const d = data

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    }

    return (
        <section aria-label="Partner" className="py-16 lg:py-20 bg-white relative overflow-hidden">
            {/* Subtle orbs */}
            <div className="absolute top-10 -left-20 w-64 h-64 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -right-20 w-72 h-72 bg-accent/[0.02] rounded-full blur-3xl pointer-events-none" />
            {/* Dot grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#3B7303_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="inline-block px-4 py-1.5 bg-primary/5 backdrop-blur-sm rounded-full text-primary text-xs font-semibold tracking-wider uppercase border border-primary/10"
                    >
                        Our Partners
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-4xl sm:text-5xl font-bold leading-[1.1] mt-4"
                    >
                        <span className="text-primary-dark">Client & </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-soft-yellow">
                            Partner
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
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
            >
                {/* Edge fades */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex animate-scroll gap-8 lg:gap-16 items-center"
                >
                    {[...d.items, ...d.items].map((p, i) => (
                        <motion.div
                            key={i}
                            variants={i < d.items.length ? itemVariants : {}}
                            whileHover={{ scale: 1.08, y: -6 }}
                            className="flex-shrink-0 w-36 sm:w-44 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100/40 shadow-sm hover:shadow-xl transition-all duration-300 p-4"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-accent/20 ring-offset-2 ring-offset-transparent shadow-md">
                                        {p.logo ? (
                                            <img
                                                src={`storage/${p.logo}`}
                                                alt={p.name}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={logo}
                                                alt={p.name}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-600 text-center leading-tight">
                                    {p.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}
