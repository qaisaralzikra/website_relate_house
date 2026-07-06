import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientPicker from "../components/GradientPicker.jsx";
import CtaSection from "../../../components/CtaSection.jsx";

export default function CtaModal({ data, onSave, onClose }) {
    const [form, setForm] = useState({ ...data });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

    const updateButton = (i, key, val) => {
        const updated = form.buttons.map((btn, idx) =>
            idx === i ? { ...btn, [key]: val } : btn,
        );
        update("buttons", updated);
    };

    useEffect(() => {
        const handler = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
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
                    aria-label="Edit CTA Section"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="bg-white rounded-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-primary-dark">
                            Edit CTA Section
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
                            <GradientPicker
                                value={form.gradient}
                                onChange={(v) => update("gradient", v)}
                                label="Background Gradient"
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="px-6 py-3 bg-red-50 border-t border-red-100 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
                        <motion.button
                            onClick={onClose}
                            disabled={saving}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Batal
                        </motion.button>
                        <motion.button
                            onClick={handleSave}
                            disabled={saving}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-light transition-colors shadow-lg"
                        >
                            {saving ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Menyimpan...
                                </span>
                            ) : (
                                "Simpan Perubahan"
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
