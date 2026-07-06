import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientPicker from "../components/GradientPicker.jsx";

export default function HeroModal({ data, onSave, onClose }) {
    const [form, setForm] = useState(() => {
        const item = data?.items?.[0] || {};
        return {
            items: [
                {
                    badge: item.badge ?? "",
                    title: item.title ?? "",
                    titleHighlight: item.titleHighlight ?? "",
                    subtitle: item.subtitle ?? "",
                    showScrollIndicator: item.showScrollIndicator ?? true,
                },
            ],
            gradient: {
                from: item.from_color ?? "#3B7303",
                via: item.via_color ?? "#2d5a02",
                to: item.to_color ?? "#FCA34B",
                angle: item.deg_color ?? "135deg",
            },
        };
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const datas = form.items[0];
    const gradient = form.gradient;

    const updateItem = (key, val) => {
        setForm((prev) => ({
            ...prev,
            items: [{ ...prev.items[0], [key]: val }],
        }));
    };

    const updateGradient = (val) => {
        setForm((prev) => ({ ...prev, gradient: val }));
    };

    useEffect(() => {
        const handler = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            await onSave(form);
        } catch (e) {
            setError(e.message || "Gagal menyimpan");
            setSaving(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end p-4"
                onClick={onClose}
            >
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Edit Hero Section"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="bg-white rounded-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-primary-dark">
                        Edit Hero Section
                    </h2>
                    <motion.button
                        onClick={onClose}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                        <svg
                            className="w-4 h-4 text-gray-600"
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

                <div className="flex-1 overflow-auto grid p-6">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Badge
                            </label>
                            <input
                                type="text"
                                value={datas.badge}
                                onChange={(e) =>
                                    updateItem("badge", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={datas.title}
                                    onChange={(e) =>
                                        updateItem("title", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Highlight
                                </label>
                                <input
                                    type="text"
                                    value={datas.titleHighlight}
                                    onChange={(e) =>
                                        updateItem(
                                            "titleHighlight",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Subtitle
                            </label>
                            <textarea
                                value={datas.subtitle}
                                onChange={(e) =>
                                    updateItem("subtitle", e.target.value)
                                }
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <GradientPicker
                            value={gradient}
                            onChange={updateGradient}
                            label="Gradient Background"
                        />

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={!!datas.showScrollIndicator}
                                onChange={(e) =>
                                    updateItem(
                                        "showScrollIndicator",
                                        e.target.checked,
                                    )
                                }
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Tampilkan Scroll Indicator
                            </span>
                        </label>
                    </div>
                </div>

                {error && (
                    <div className="px-6 py-3 bg-red-50 border-t border-red-100 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <motion.div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
                    <motion.button
                        onClick={onClose}
                        disabled={saving}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        Batal
                    </motion.button>
                    <motion.button
                        onClick={handleSave}
                        disabled={saving}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-light transition-colors shadow-lg disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving && (
                            <svg
                                className="w-4 h-4 animate-spin"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                        )}
                        {saving ? "Menyimpan..." : "Simpan Perubahan"}
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
        </AnimatePresence>
    );
}
