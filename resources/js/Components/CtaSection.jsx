import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useOnScreen from "../hooks/useOnScreen.jsx";

export default function CtaSection({ data }) {
    const d = data;
    const [ref, visible] = useOnScreen();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const grad = `linear-gradient(${d.deg_color ?? "135deg"}, ${d.from ?? "#3B7303"} 0%, ${d.via ?? "#FCA34B"} 50%, ${d.to ?? "#FDFD96"} 100%)`;

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        try {
            const res = await fetch("/cta/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? "" },
                body: JSON.stringify({ email }),
            });
            if (res.ok) setSent(true);
        } catch {
            //
        } finally {
            setLoading(false);
        }
    }

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1, y: 0,
            transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
        }),
    };

    return (
        <section
            id="cta"
            aria-label="Call to action"
            className="py-20 lg:py-28 relative overflow-hidden"
            style={{ background: grad }}
        >
            {/* Dot grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />

            {/* Floating orbs */}
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-white/[0.08] rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-white/[0.05] rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: "4s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: "6s" }} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="space-y-8"
                >
                    {/* Glass badge */}
                    <motion.span
                        custom={0}
                        variants={fadeUp}
                        className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-xs font-semibold tracking-wider uppercase border border-white/20"
                    >
                        Get In Touch
                    </motion.span>

                    {/* Title */}
                    <motion.h2
                        custom={1}
                        variants={fadeUp}
                        className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight"
                    >
                        Ready To Create Something{" "}
                        <span className="text-primary-dark">
                            Amazing Together?
                        </span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        custom={2}
                        variants={fadeUp}
                        className="text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto"
                    >
                        Hubungi kami sekarang dan wujudkan acara impian Anda
                        bersama Relate Organize. Tim kami siap membantu dari
                        konsep hingga eksekusi.
                    </motion.p>

                    {/* Form / Success */}
                    <motion.div
                        custom={3}
                        variants={fadeUp}
                        className="relative"
                    >
                        <AnimatePresence mode="wait">
                            {sent ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
                                        className="w-16 h-16 rounded-full bg-white mx-auto mb-4 flex items-center justify-center shadow-lg"
                                    >
                                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                    <p className="text-white text-xl font-semibold">
                                        Email Terkirim!
                                    </p>
                                    <p className="text-white/70 text-sm mt-2">
                                        Kami akan segera menghubungi Anda.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.4 }}
                                    className="max-w-xl lg:max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-full border border-white/20 shadow-[0px_0px_60px_rgba(0,0,0,0.15)] p-2 sm:p-1.5"
                                >
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0">
                                        <div className="w-12 h-12 sm:w-[60px] sm:h-[60px] bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10">
                                            <i
                                                className="ri-mail-fill text-xl sm:text-[32px] text-white"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div className="flex items-center gap-3 px-4 flex-1">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter Email Address"
                                                required
                                                className="border-none focus:outline-none w-full text-sm sm:text-base lg:text-xl text-white placeholder:text-white/50 bg-transparent"
                                            />
                                        </div>
                                        <div className="px-2 sm:px-1 pb-2 sm:pb-0">
                                            <motion.button
                                                type="submit"
                                                disabled={loading}
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.96 }}
                                                className="w-full sm:w-auto px-6 sm:px-10 lg:px-[60px] h-12 sm:h-[56px] font-semibold text-sm sm:text-base lg:text-lg bg-white text-primary rounded-full cursor-pointer transition-all whitespace-nowrap disabled:opacity-60 shadow-lg hover:shadow-xl"
                                            >
                                                {loading ? (
                                                    <span className="flex items-center gap-2 justify-center">
                                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                        </svg>
                                                        Sending...
                                                    </span>
                                                ) : "Book Call"}
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
