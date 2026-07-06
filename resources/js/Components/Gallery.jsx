import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import Team from "../../../public/assets/team.webp";

export default function Gallery({ data, onItemClick }) {
    const d = data || contextData.gallery;
    const [selected, setSelected] = useState(null);
    const ref = useRef(null);
    const visible = useInView(ref, { once: true, margin: "-100px" });

    // console.log(d)

    return (
        <section
            id="gallery"
            aria-label="Galeri"
            className="py-20 lg:py-28 bg-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <span className="text-accent font-semibold text-sm tracking-widest uppercase">
                        #Click Item Acara Jika Ingin Update Galery
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-dark mt-2">
                        Galeri <span className="text-primary">Acara</span>
                    </h2>
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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {d.items.map((photo, i) => (
                        <motion.button
                            key={photo.id || i}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            onClick={() =>
                                onItemClick
                                    ? onItemClick(photo)
                                    : setSelected(photo)
                            }
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`${i === 0 ? "lg:col-span-2" : ""} ${i === 5 ? "lg:col-span-2" : ""} ${i === 6 ? "lg:col-span-2" : ""} h-[300px] w-full group relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-soft-yellow/20 hover:shadow-xl transition-all duration-300 ${photo.span}`}
                        >
                            {(() => {
                                const src = Array.isArray(photo.image)
                                    ? photo.image[0]
                                    : photo.image;
                                return src ? (
                                    <img
                                        src={`storage/${src}`}
                                        alt={photo.label}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={Team}
                                        alt={photo.label}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover"
                                    />
                                );
                            })()}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <span className="text-white text-sm font-semibold tracking-wide bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                                    {photo.label}
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {!onItemClick && selected && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={selected.label}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent/20 to-soft-yellow/30 flex items-center justify-center text-8xl relative">
                                {(() => {
                                    const src = Array.isArray(selected.image)
                                        ? selected.image[0]
                                        : selected.image;
                                    return src ? (
                                        <img
                                            src={`storage/${src}`}
                                            alt={selected.label}
                                            decoding="async"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span>{selected.icon}</span>
                                    );
                                })()}
                                <motion.button
                                    onClick={() => setSelected(null)}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </motion.button>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-primary-dark">
                                    {selected.label}
                                </h3>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}
        </section>
    );
}
