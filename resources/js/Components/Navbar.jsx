import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Beranda", href: "https://relatehouse.id/#hero" },
    { name: "Tentang", href: "https://relatehouse.id/#about" },
    { name: "Layanan", href: "https://relatehouse.id/#services" },
    { name: "Portfolio", href: "https://relatehouse.id/#portfolio" },
    { name: "Testimoni", href: "https://relatehouse.id/#testimonials" },
    { name: "Kontak", href: "https://relatehouse.id/#footer" },
];

import Logo from "../../../public/assets/Logo Relate6.webp";

const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.4, delay: i * 0.06 },
    }),
};

const mobileItem = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
        opacity: 1, x: 0,
        transition: { duration: 0.35, delay: i * 0.07, ease: "easeOut" },
    }),
    exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrolled || open
                    ? "bg-primary/95 backdrop-blur-md shadow-lg"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <motion.a
                        href="#hero"
                        onClick={() => setOpen(false)}
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center z-50"
                    >
                        <img
                            src={Logo}
                            alt="Logo"
                            fetchpriority="high"
                            decoding="async"
                            className="h-8 sm:h-10 w-auto object-contain"
                        />
                    </motion.a>

                    {/* Desktop Menu */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                        className="hidden lg:flex items-center gap-8"
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                custom={i}
                                variants={linkVariants}
                                className="relative group"
                            >
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    role="menuitem"
                                    onClick={() => setOpen(false)}
                                    custom={i}
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="block text-white/90 hover:text-accent transition-colors text-[16px] font-medium py-2"
                                >
                                    {link.name}
                                </motion.a>
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent rounded-full origin-left"
                                />
                            </motion.div>
                        ))}
                        <motion.a
                            href="#cta"
                            custom={navLinks.length}
                            variants={linkVariants}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(252, 164, 75, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-accent text-primary-dark px-5 py-2 rounded-full font-semibold text-sm hover:bg-accent-dark transition-colors shadow-lg"
                        >
                            Hubungi Kami
                        </motion.a>
                    </motion.div>

                    {/* Hamburger Button */}
                    <motion.button
                        onClick={() => setOpen(!open)}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="lg:hidden text-white p-2 z-50 focus:outline-none"
                        aria-label={open ? "Tutup menu" : "Buka menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {open ? (
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-menu"
                        role="menu"
                        key="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden fixed inset-x-0 top-0 h-screen bg-primary/98 backdrop-blur-lg z-40 flex flex-col justify-center"
                    >
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                            }}
                            className="px-6 space-y-6 text-center"
                        >
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    role="menuitem"
                                    onClick={() => setOpen(false)}
                                    custom={index}
                                    variants={mobileItem}
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="block text-white/90 hover:text-accent transition-colors text-xl font-medium py-2"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.div
                                custom={navLinks.length}
                                variants={mobileItem}
                                className="pt-4"
                            >
                                <motion.a
                                    href="#cta"
                                    onClick={() => setOpen(false)}
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(252, 164, 75, 0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-block w-full max-w-xs bg-accent text-primary-dark px-6 py-3 rounded-full font-bold text-base shadow-md"
                                >
                                    Hubungi Kami
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
