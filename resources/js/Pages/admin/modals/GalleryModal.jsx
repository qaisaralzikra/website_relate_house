import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageInput from "../components/ImageInput.jsx";

export default function GalleryModal({ data, onSave, onClose, onDelete, mode, editItem }) {
    const projects = data?.project || [];
    const isEdit = mode === "edit" && editItem;

    const [form, setForm] = useState(() => {
        if (isEdit) {
            const images = Array.isArray(editItem.image) ? editItem.image : (editItem.image ? [editItem.image] : []);
            return {
                project_id: editItem.project_id || "",
                label: editItem.label || "",
                image: images,
            };
        }
        return {
            project_id: projects[0]?.id || "",
            label: "",
            image: [],
        };
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handler = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

    const updateImage = (index, val) => {
        const updated = [...form.image];
        if (val === "" || val === null) {
            updated.splice(index, 1);
        } else {
            updated[index] = val;
        }
        update("image", updated);
    };

    const addImage = () => {
        update("image", [...form.image, ""]);
    };

    const removeImage = (index) => {
        const updated = form.image.filter((_, i) => i !== index);
        update("image", updated);
    };

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

    const handleDelete = async () => {
        if (!isEdit || !editItem?.id) return;
        setSaving(true);
        setError(null);
        try {
            await onDelete(editItem.id);
        } catch (e) {
            setError(e.message || "Gagal menghapus");
            setSaving(false);
        }
    };

    const selectedProject = projects.find((p) => String(p.id) === String(form.project_id));

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
                    aria-label={isEdit ? "Edit Gallery Item" : "Tambah Gallery Item"}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="bg-white rounded-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-primary-dark">
                            {isEdit ? "Edit Gallery" : "Tambah Gallery Baru"}
                        </h2>
                        <motion.button
                            onClick={onClose}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                        >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>
                    </div>
                    <div className="flex-1 overflow-auto p-6">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Nama Project
                                </label>
                                <select
                                    value={form.project_id || ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        update("project_id", val);
                                        const project = projects.find((p) => String(p.id) === String(val));
                                        if (project && !isEdit) {
                                            update("label", project.nama_project || "");
                                        }
                                    }}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-shadow"
                                >
                                    <option value="" disabled>-- Pilih Project --</option>
                                    {projects.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.nama_project}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    value={form.label || ""}
                                    onChange={(e) => update("label", e.target.value)}
                                    placeholder={selectedProject?.nama_project || "Label gallery"}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Foto Gallery
                                </label>
                                <p className="text-xs text-gray-400">({form.image.length} / 12)</p>
                                {form.image.map((img, imgIdx) => (
                                    <div key={imgIdx} className="flex items-start gap-2">
                                        <div className="flex-1">
                                            <ImageInput
                                                value={img}
                                                onChange={(val) => updateImage(imgIdx, val)}
                                            />
                                        </div>
                                        <motion.button
                                            type="button"
                                            onClick={() => removeImage(imgIdx)}
                                            whileTap={{ scale: 0.9 }}
                                            className="mt-7 text-xs text-red-500 hover:text-red-700 font-semibold shrink-0"
                                        >
                                            Hapus
                                        </motion.button>
                                    </div>
                                ))}
                                {form.image.length < 12 && (
                                    <motion.button
                                        type="button"
                                        onClick={addImage}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-1.5 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:border-primary hover:text-primary transition-colors"
                                    >
                                        + Tambah Gambar
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>
                    {error && (
                        <div className="px-6 py-3 bg-red-50 border-t border-red-100 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-100">
                        <div>
                            {isEdit && (
                                <motion.button
                                    onClick={handleDelete}
                                    disabled={saving}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    Hapus
                                </motion.button>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
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
                                    "Simpan"
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}