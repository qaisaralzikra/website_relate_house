import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ListEditor from "../components/ListEditor.jsx";
import Testimonials from "../../../components/Testimonials.jsx";

export default function TestimonialsModal({ data, onSave, onClose }) {
    const [form, setForm] = useState(() => ({
        items: data?.items || [],
        project: data?.project || [],
    }));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

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
        } finally {
            setSaving(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                key="overlay"
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end p-4"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Edit Testimonials"
                    className="bg-white rounded-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-primary-dark">
                            Edit Testimonials
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
                    <div className="flex-1 overflow-auto p-6">
                        <div className="space-y-5">
                            <ListEditor
                                items={form.items}
                                onChange={(v) => update("items", v)}
                                title="Testimoni"
                                fields={[
                                    {
                                        key: "project_id",
                                        label: "Nama Project",
                                        type: "select",
                                        default: form.project[0]?.id || "",
                                        options: form.project.map((p) => ({
                                            value: p.id,
                                            label: p.nama_project,
                                        })),
                                    },
                                    {
                                        key: "image",
                                        label: "Image",
                                        type: "image",
                                    },
                                    { key: "name", label: "Nama", default: "" },
                                    {
                                        key: "event",
                                        label: "Nama Event",
                                        default: "",
                                    },
                                    {
                                        key: "review",
                                        label: "Review",
                                        type: "textarea",
                                        default: "",
                                        rows: 3,
                                    },
                                    { key: "role", label: "Jabatan", default: "" },
                                    {
                                        key: "rating",
                                        label: "Rating (1-5)",
                                        default: "5",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    {error && (<div className="px-6 py-3 bg-red-50 border-t border-red-100 text-sm text-red-600">{error}</div>)}
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
                            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-light transition-colors shadow-lg flex items-center"
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : 'Simpan Perubahan'}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
