import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageInput from "../components/ImageInput.jsx";
import ListEditor from "../components/ListEditor.jsx";
// import About from "../../../components/About.jsx";

export default function AboutModal({ data, onSave, onClose }) {
    // 1. Inisialisasi form dengan memformat path gambar dari database agar bisa dibaca oleh ImageInput
    const [form, setForm] = useState(() => {
        const rawItems = data?.items || [{}];

        // Gandakan item pertama untuk memanipulasi properti image-nya
        const formattedItems = rawItems.map((item, index) => {
            if (index === 0 && item.image) {
                // Jika path gambar berasal dari database (bukan Base64 baru), arahkan ke folder publik storage
                if (
                    !item.image.startsWith("data:image") &&
                    !item.image.startsWith("http")
                ) {
                    return { ...item, image: `/storage/${item.image}` };
                }
            }
            return item;
        });

        return {
            ...data,
            items: formattedItems,
        };
    });

    // Ambil referensi objek pertama dari array items
    const datas = form.items[0] || {};

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handler = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    // 2. Fungsi update data bersarang di dalam items[0]
    const updateItem = (key, val) => {
        setForm((prevForm) => {
            const updatedItems = [...prevForm.items];
            updatedItems[0] = { ...updatedItems[0], [key]: val };
            return { ...prevForm, items: updatedItems };
        });
    };

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
                    aria-label="Edit About Section"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="bg-white rounded-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-primary-dark">
                            Edit About Section
                        </h2>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            disabled={saving}
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
                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* INPUT TITLE */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={datas.title || ""}
                                        onChange={(e) =>
                                            updateItem("title", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                    />
                                </div>
                                {/* INPUT HIGHLIGHT */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Highlight
                                    </label>
                                    <input
                                        type="text"
                                        value={datas.titleHighlight || ""}
                                        onChange={(e) =>
                                            updateItem(
                                                "titleHighlight",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                    />
                                </div>
                            </div>

                            {/* TEXTAREA DESKRIPSI 1 */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Deskripsi 1
                                </label>
                                <textarea
                                    value={datas.desc_1 || ""}
                                    onChange={(e) =>
                                        updateItem("desc_1", e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                />
                            </div>

                            {/* TEXTAREA DESKRIPSI 2 */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Deskripsi 2
                                </label>
                                <textarea
                                    value={datas.desc_2 || ""}
                                    onChange={(e) =>
                                        updateItem("desc_2", e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                />
                            </div>

                            {/* INPUT GAMBAR (IMAGEINPUT) */}
                            <div>
                                <ImageInput
                                    label="Gambar About"
                                    value={datas.image || ""}
                                    onChange={(val) => updateItem("image", val)}
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="px-6 py-3 bg-red-50 border-t border-red-100 text-sm text-red-600">{error}</div>
                    )}

                    <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            disabled={saving}
                            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Batal
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-light transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Menyimpan...
                                </span>
                            ) : (
                                'Simpan Perubahan'
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
