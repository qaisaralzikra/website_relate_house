import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.5, delay: i * 0.1 },
    }),
};

export default function Footer({ data }) {
    const d = data.items;
    const year = new Date().getFullYear();

    const navLinks = [
        { name: "Beranda", href: "#hero" },
        { name: "Tentang", href: "#about" },
        { name: "Layanan", href: "#services" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Testimoni", href: "#testimonials" },
        { name: "Kontak", href: "#footer" },
    ];

    return (
        <footer
            id="footer"
            aria-label="Footer"
            className="relative"
            style={{
                background: "linear-gradient(180deg, #2d5a02 0%, #1a3d01 100%)",
            }}
        >
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
                >
                    <motion.div custom={0} variants={fadeUp} className="space-y-4">
                        <h3 className="text-white font-bold text-2xl">
                            {d.brandName}
                            <span className="text-accent">
                                {d.brandHighlight}
                            </span>
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                            {d.description}
                        </p>
                    </motion.div>
                    <motion.div custom={1} variants={fadeUp}>
                        <h4 className="text-white font-semibold text-lg mb-5">
                            Navigasi
                        </h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <motion.a
                                        href={link.href}
                                        whileHover={{ x: 4 }}
                                        className="text-white/70 hover:text-accent transition-colors text-sm inline-block"
                                    >
                                        {link.name}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div custom={2} variants={fadeUp}>
                        <h4 className="text-white font-semibold text-lg mb-5">
                            Layanan
                        </h4>
                        <ul className="space-y-3">
                            {d.services.map((svc, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="text-white/70 text-sm"
                                >
                                    {svc.title}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div custom={3} variants={fadeUp}>
                        <h4 className="text-white font-semibold text-lg mb-5">
                            Kontak
                        </h4>
                        <ul className="space-y-4">
                            <motion.li whileHover={{ x: 4 }}>
                                <a
                                    href={`mailto:${d.contact.email}`}
                                    className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors text-sm group"
                                >
                                    <svg
                                        className="w-4 h-4 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    {d.contact.email}
                                </a>
                            </motion.li>
                            <motion.li whileHover={{ x: 4 }}>
                                <a
                                    href={d.contact.whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors text-sm group"
                                >
                                    <svg
                                        className="w-4 h-4 flex-shrink-0"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    {d.contact.phone}
                                </a>
                            </motion.li>
                            <motion.li whileHover={{ x: 4 }}>
                                <a
                                    href="https://maps.app.goo.gl/ueYNdQYBfR4X5siV6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="flex items-start gap-3 text-white/70 text-sm">
                                        <svg
                                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span>{d.contact.address}</span>
                                    </div>
                                </a>
                            </motion.li>
                        </ul>
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                    <p className="text-white/50 text-sm">
                        &copy; {year} {d.copyright}
                    </p>
                    <p className="text-white/40 text-xs">{d.tagline}</p>
                </motion.div>
            </div>
        </footer>
    );
}
