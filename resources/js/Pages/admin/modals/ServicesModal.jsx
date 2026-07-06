import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientPicker from "../components/GradientPicker";
import ListEditor from "../components/ListEditor";

export default function ServicesModal({ data, onSave, onClose }) {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // Inisialisasi state dengan memetakan kolom database ke objek struktur picker
    const [form, setForm] = useState(() => {
        const headingData = data?.heading?.[0] || {};
        
        return {
            ...data,
            heading: [
                {
                    badge: headingData.badge || "",
                    title: headingData.title || "",
                    titleHighlight: headingData.titleHighlight || "",
                    desc: headingData.desc || "",
                    // PEMETAAN DI SINI: Ambil dari nama kolom database asli
                    gradient: {
                        from: headingData.from_color || '#3B7303',
                        via: headingData.via_color || '#2d5a02',
                        to: headingData.to_color || '#FCA34B',
                        deg: headingData.deg !== undefined ? parseInt(headingData.deg) : 135
                    }
                }
            ],
            items: data?.items || [],
        };
    });

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
            setError(e.message || 'Gagal menyimpan');
            setSaving(false);
        }
    };

    // Fungsi pembantu untuk memperbarui root data tingkat atas (seperti array items)
    const updateRoot = (key, val) => setForm((p) => ({ ...p, [key]: val }));

    // Fungsi khusus untuk memperbarui kolom text di dalam form.heading[0]
    const updateHeading = (key, val) => {
        setForm((prevForm) => {
            const updatedHeading = [...prevForm.heading];
            updatedHeading[0] = { ...updatedHeading[0], [key]: val };
            return { ...prevForm, heading: updatedHeading };
        });
    };

    // Ambil referensi heading pertama dengan fallback objek aman
    const currentHeading = form.heading[0] || {};

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
                    aria-label="Edit Services Section"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="bg-white rounded-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-primary-dark">
                            Edit Services Section
                        </h2>
                        <button
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
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto p-6">
                        <div className="space-y-5">
                            {/* INPUT BADGE */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Badge
                                </label>
                                <input
                                    type="text"
                                    value={currentHeading.badge || ""}
                                    onChange={(e) =>
                                        updateHeading("badge", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                />
                            </div>

                            {/* INPUT TITLE & HIGHLIGHT */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={currentHeading.title || ""}
                                        onChange={(e) =>
                                            updateHeading("title", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Highlight
                                    </label>
                                    <input
                                        type="text"
                                        value={currentHeading.titleHighlight || ""}
                                        onChange={(e) =>
                                            updateHeading(
                                                "titleHighlight",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                    />
                                </div>
                            </div>

                            {/* TEXTAREA DESKRIPSI */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={currentHeading.desc || ""}
                                    onChange={(e) =>
                                        updateHeading("desc", e.target.value)
                                    }
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                />
                            </div>

                            {/* GRADIENT PICKER */}
                            <GradientPicker
                                value={currentHeading.gradient}
                                onChange={(v) => updateHeading("gradient", v)}
                                label="Gradient Background"
                            />

                            {/* LIST EDITOR UNTUK DAFTAR LAYANAN */}
                            <ListEditor
                                items={form.items}
                                onChange={(v) => updateRoot("items", v)}
                                title="Layanan"
                                fields={[
                                    {
                                        key: "icon",
                                        label: "Icon (emoji)",
                                        default: "📦",
                                        type: "text",
                                    },
                                    { key: "title", label: "Judul", default: "" },
                                    {
                                        key: "desc",
                                        label: "Deskripsi",
                                        type: "textarea",
                                        default: "",
                                        rows: 2,
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="px-6 py-3 bg-red-50 border-t border-red-100 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            disabled={saving}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
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
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
