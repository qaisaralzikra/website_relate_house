import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ListEditor from "../components/ListEditor.jsx";
import Portfolio from "../../../components/Portfolio.jsx";

import heic2any from "heic2any";

export default function PortfolioModal({ data, onSave, onClose }) {
    const [form, setForm] = useState(() => ({
        cat: data?.cat || [{ category: "All" }],
        items: data?.items || [],
        ...data,
    }));
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
    const [catInput, setCatInput] = useState("");

    const addCategory = () => {
        const isExist = form.cat.some(
            (c) => c.category.toLowerCase() === catInput.trim().toLowerCase(),
        );

        if (catInput.trim() && !isExist) {
            const newCategoryObj = { category: catInput.trim() };
            update("cat", [...form.cat, newCategoryObj]);
            setCatInput("");
        }
    };

    const removeCategory = (catTarget) => {
        if (catTarget.category === "All") return;

        const updatedCats = form.cat.filter(
            (c) => c.category === "All" || c.category !== catTarget.category,
        );

        const nextAvailableOpt =
            updatedCats.filter((c) => c.category !== "All")[0]?.category || "";

        const updatedItems = form.items.map((item) => {
            if (item.category === catTarget.category) {
                return { ...item, category: nextAvailableOpt };
            }
            return item;
        });

        setForm((p) => ({
            ...p,
            cat: updatedCats,
            items: updatedItems,
        }));
    };

    const handleSubmit = async () => {
        setSaving(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("cat", JSON.stringify(form.cat));
            form.items.forEach((item, index) => {
                formData.append(`items[${index}][id]`, item.id || "");
                formData.append(
                    `items[${index}][sub_kategori]`,
                    item.sub_kategori || "",
                );
                formData.append(`items[${index}][title]`, item.title || "");
                formData.append(`items[${index}][desc]`, item.desc || "");
                formData.append(
                    `items[${index}][category]`,
                    item.category || "",
                );
                formData.append(
                    `items[${index}][guest_count]`,
                    item.guest_count || "",
                );
                formData.append(
                    `items[${index}][location]`,
                    item.location || "",
                );
                formData.append(
                    `items[${index}][preparation_time]`,
                    item.preparation_time || "",
                );
                formData.append(
                    `items[${index}][challenge]`,
                    item.challenge || "",
                );
                formData.append(
                    `items[${index}][solution]`,
                    item.solution || "",
                );
                formData.append(`items[${index}][results]`, item.results || "");
                formData.append(
                    `items[${index}][is_featured]`,
                    item.is_featured === "1" ? "1" : "0",
                );
                if (item.image instanceof File) {
                    formData.append(`items[${index}][image]`, item.image);
                } else {
                    formData.append(`items[${index}][image]`, item.image || "");
                }
                if (item.video instanceof File) {
                    formData.append(`items[${index}][video]`, item.video);
                } else {
                    formData.append(`items[${index}][video]`, item.video || "");
                }
            });
            await onSave(formData);
        } catch (e) {
            setError(e.message || "Gagal menyimpan");
            setSaving(false);
        }
    };

    const handleImageConvert = async (file) => {
        if (!file) return null;

        if (
            file.name.toLowerCase().endsWith(".heic") ||
            file.type === "image/heic"
        ) {
            try {
                const convertedBlob = await heic2any({
                    blob: file,
                    toType: "image/jpeg",
                    quality: 0.8,
                });

                return new File(
                    [convertedBlob],
                    file.name.replace(/\.[^/.]+$/, "") + ".jpg",
                    { type: "image/jpeg" },
                );
            } catch (error) {
                console.error("Gagal mengonversi file HEIC:", error);
                return file; // fallback ke file asli jika gagal
            }
        }
        return file;
    };

    console.log(form);

    const dynamicOptions = form.cat
        .filter((c) => c.category !== "All")
        .map((c) => c.category);

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
                    aria-label="Edit Portfolio Section"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-white rounded-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-primary-dark">
                            Edit Portfolio Section
                        </h2>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                            disabled={saving}
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
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Kategori
                                </label>

                                <div className="flex flex-wrap gap-2 mb-2">
                                    {form.cat.map((c, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                                        >
                                            {c.category}
                                            {c.category !== "All" && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeCategory(c);
                                                    }}
                                                    className="hover:text-red-500 font-bold ml-0.5"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={catInput}
                                        onChange={(e) =>
                                            setCatInput(e.target.value)
                                        }
                                        placeholder="Kategori baru"
                                        className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                    />
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={addCategory}
                                        className="px-4 py-1.5 bg-primary text-white text-xs rounded-lg font-semibold hover:bg-primary-light transition-colors"
                                        disabled={saving}
                                    >
                                        Tambah
                                    </motion.button>
                                </div>
                            </div>

                            <ListEditor
                                items={form.items}
                                onChange={(v) => update("items", v)}
                                title="Portfolio Items"
                                max={20}
                                fields={[
                                    {
                                        key: "image",
                                        label: "Gambar",
                                        type: "image",
                                        placeholder: "Gambar Utama",
                                    },
                                    {
                                        key: "video",
                                        label: "Video",
                                        type: "video",
                                        placeholder: "Video Highlight",
                                    },
                                    {
                                        key: "category",
                                        label: "Kategori",
                                        type: "select",
                                        default: dynamicOptions[0] || "",
                                        options: dynamicOptions,
                                    },
                                    {
                                        key: "sub_kategori",
                                        label: "Sub Kategori",
                                        default: "",
                                        placeholder: "Jenis Acara",
                                    },
                                    {
                                        key: "title",
                                        label: "Judul",
                                        default: "",
                                        placeholder: "Nama Acara",
                                    },
                                    {
                                        key: "guest_count",
                                        label: "Jumlah Tamu",
                                        default: "",
                                        placeholder: "100 Tamu",
                                    },
                                    {
                                        key: "location",
                                        label: "Lokasi",
                                        default: "",
                                        placeholder: "Lokasi Acara",
                                    },
                                    {
                                        key: "preparation_time",
                                        label: "Lama Persiapan",
                                        default: "",
                                        placeholder: "Persiapan Acara",
                                    },
                                    {
                                        key: "desc",
                                        label: "Deskripsi",
                                        type: "textarea",
                                        default: "",
                                        rows: 2,
                                        placeholder: "Deskripsi Acara",
                                    },
                                    // {
                                    //     key: "challenge",
                                    //     label: "Tantangan",
                                    //     type: "textarea",
                                    //     default: "",
                                    //     rows: 3,
                                    //     placeholder: "Tantangan Acara",
                                    // },
                                    // {
                                    //     key: "solution",
                                    //     label: "Solusi",
                                    //     type: "textarea",
                                    //     default: "",
                                    //     rows: 3,
                                    //     placeholder: "Solusi yang Diberikan",
                                    // },
                                    {
                                        key: "results",
                                        label: "Hasil",
                                        type: "textarea",
                                        default: "",
                                        rows: 3,
                                        placeholder: "Hasil Acara",
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="px-6 py-3 bg-red-50 border-t border-red-100">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            disabled={saving}
                        >
                            Batal
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSubmit}
                            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-light transition-colors shadow-lg flex items-center gap-2"
                            disabled={saving}
                        >
                            {saving && (
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            )}
                            {saving ? "Menyimpan..." : "Simpan Perubahan"}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
