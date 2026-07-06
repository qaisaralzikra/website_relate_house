import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Services({ data }) {
    const ref = useRef(null);
    const visible = useInView(ref, { once: true, margin: "-100px" });

    // 1. Amankan ekstraksi data: Cek apakah dibungkus 'servicesData' atau langsung objeknya
    const actualData = data?.servicesData ? data.servicesData : data;

    // 2. Berikan fallback objek/array kosong agar tidak crash saat data loading
    const d = actualData?.heading?.[0] || {};
    const service = actualData?.items || [];

    // 3. Gabungkan logic string derajat secara aman
    const angle = d.deg
        ? String(d.deg).includes("deg")
            ? d.deg
            : `${d.deg}deg`
        : "135deg";

    const grad = `linear-gradient(${angle}, ${d.from_color || "#3B7303"} 0%, ${d.via_color || "#2d5a02"} 50%, ${d.to_color || "#FCA34B"} 100%)`;

    return (
        <section
            id="services"
            aria-label="Layanan"
            className="py-20 lg:py-28 relative overflow-hidden"
            style={{ background: grad }}
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 bg-primary/5 backdrop-blur-sm rounded-full text-primary text-xs font-semibold tracking-wider uppercase border border-primary/10"
                    >
                        {d.badge || ""}
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-[24px]"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-dark mt-2">
                            {d.title || ""}{" "}
                            <span
                                className="text-accent"
                                style={{
                                    textShadow:
                                        "0 0 20px rgba(252, 164, 76, 0.5)",
                                }}
                            >
                                {d.titleHighlight || ""}
                            </span>
                        </h2>
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.25,
                            ease: "easeOut",
                        }}
                        className="flex items-center justify-center gap-2 origin-left"
                    >
                        <span className="block w-12 h-1 rounded-full bg-accent" />
                        <span className="block w-3 h-3 rounded-full bg-primary" />
                        <span className="block w-20 h-0.5 rounded-full bg-primary/30" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="text-gray-600 leading-8 text-base lg:text-lg text-center"
                    >
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            {d.desc || ""}
                        </p>
                    </motion.p>
                </div>
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
                    className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
                >
                    {service.map((svc, i) => (
                        <motion.a
                            key={svc.id || i}
                            href={`/detail/service/${svc.id}`}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ y: -8 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="group bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 transition-transform">
                                    {svc.icon || "📦"}
                                </div>
                                <h3 className="text-xl font-bold text-primary-dark mb-3">
                                    {svc.title || ""}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                                    {svc.desc || ""}
                                </p>
                                <div className="mt-5 h-1 w-0 group-hover:w-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500" />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
