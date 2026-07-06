import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../../components/Footer.jsx";

export default function FooterModal({ data, onSave, onClose }) {
    const [form, setForm] = useState({
        brandName: data?.items?.brandName || "",
        brandHighlight: data?.items?.brandHighlight || "",
        description: data?.items?.description || "",
        copyright: data?.items?.copyright || "",
        tagline: data?.items?.tagline || "",
        email: data?.items?.contact?.email || "",
        whatsapp:
            data?.items?.contact?.whatsapp || data?.items?.contact?.phone || "",
        whatsappUrl: data?.items?.contact?.whatsappUrl || "",
        address: data?.items?.contact?.address || "",
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

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
                    aria-label="Edit Footer"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="bg-white rounded-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-primary-dark">
                            Edit Footer
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
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Brand Name
                                    </label>
                                    <input
                                        type="text"
                                        value={form.brandName}
                                        onChange={(e) =>
                                            update("brandName", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Highlight
                                    </label>
                                    <input
                                        type="text"
                                        value={form.brandHighlight}
                                        onChange={(e) =>
                                            update("brandHighlight", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary transition-shadow"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) =>
                                        update("description", e.target.value)
                                    }
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary transition-shadow"
                                />
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                    Kontak
                                </h4>
                                <div className="space-y-2">
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            value={form.email}
                                            onChange={(e) =>
                                                update("email", e.target.value)
                                            }
                                            className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:border-primary transition-shadow"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            WhatsApp Number
                                        </label>
                                        <input
                                            type="text"
                                            value={form.whatsapp}
                                            onChange={(e) =>
                                                update("whatsapp", e.target.value)
                                            }
                                            className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:border-primary transition-shadow"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            WhatsApp URL
                                        </label>
                                        <input
                                            type="text"
                                            value={form.whatsappUrl}
                                            onChange={(e) =>
                                                update(
                                                    "whatsappUrl",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:border-primary transition-shadow"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            Alamat
                                        </label>
                                        <textarea
                                            value={form.address}
                                            onChange={(e) =>
                                                update("address", e.target.value)
                                            }
                                            rows={2}
                                            className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:border-primary transition-shadow"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Copyright Text
                                    </label>
                                    <input
                                        type="text"
                                        value={form.copyright}
                                        onChange={(e) =>
                                            update("copyright", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Tagline
                                    </label>
                                    <input
                                        type="text"
                                        value={form.tagline}
                                        onChange={(e) =>
                                            update("tagline", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary transition-shadow"
                                    />
                                </div>
                            </div>
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
