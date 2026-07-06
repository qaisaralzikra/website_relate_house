import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageInput from "../components/ImageInput";

function formatRupiah(n) {
    if (!n && n !== 0) return "";
    return new Intl.NumberFormat("id-ID").format(n);
}

function parseRupiah(s) {
    if (!s) return null;
    const cleaned = String(s).replace(/[^0-9]/g, "");
    return cleaned ? parseInt(cleaned, 10) : null;
}

export default function PriceModal({ data, onSave, onClose }) {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [selectedBanomId, setSelectedBanomId] = useState(null);

    const services = data?.services || [];

    const [categories, setCategories] = useState([]);

    const banom = services.find((s) => s.id === selectedBanomId);

    function tempId() {
        return `temp_${Date.now()}_${Math.random()}`;
    }

    useEffect(() => {
        if (banom) {
            const cats = (banom.image_services || []).map((is) => ({
                _id: is.id || tempId(),
                id: is.id || null,
                name: is.name || "",
                image: is.image || "",
                pakets: (banom.price_services || [])
                    .filter((p) => p.id_image_service === is.id)
                    .map((p) => ({
                        _id: p.id || tempId(),
                        id: p.id || null,
                        paket_name: p.paket_name || "",
                        paket_desc: p.paket_desc || "",
                        populer: p.populer || false,
                        list: (p.list_pakets || []).map((l, i) => ({
                            _id: l.id || tempId(),
                            id: l.id || null,
                            item_name: l.item_name || "",
                            nominal: l.nominal || null,
                        })),
                    })),
            }));
            const uncategorized = (banom.price_services || [])
                .filter((p) => !p.id_image_service)
                .map((p) => ({
                    _id: p.id || tempId(),
                    id: p.id || null,
                    paket_name: p.paket_name || "",
                    paket_desc: p.paket_desc || "",
                    populer: p.populer || false,
                    list: (p.list_pakets || []).map((l, i) => ({
                        _id: l.id || tempId(),
                        id: l.id || null,
                        item_name: l.item_name || "",
                        nominal: l.nominal || null,
                    })),
                }));
            if (uncategorized.length > 0) {
                cats.unshift({
                    _id: "__uncategorized__",
                    id: null,
                    name: "Tanpa Kategori",
                    image: "",
                    pakets: uncategorized,
                });
            }
            setCategories(cats);
        } else {
            setCategories([]);
        }
    }, [selectedBanomId, banom]);

    useEffect(() => {
        const handler = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const updateCategory = (index, key, val) => {
        setCategories((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], [key]: val };
            return next;
        });
    };

    const addCategory = () => {
        setCategories((prev) => [
            ...prev,
            {
                _id: tempId(),
                id: null,
                name: "",
                image: "",
                pakets: [],
            },
        ]);
    };

    const removeCategory = (index) => {
        setCategories((prev) => prev.filter((_, i) => i !== index));
    };

    const addPaket = (catIndex) => {
        setCategories((prev) => {
            const next = [...prev];
            const pakets = [...(next[catIndex].pakets || [])];
            pakets.push({
                _id: tempId(),
                id: null,
                paket_name: "",
                paket_desc: "",
                populer: false,
                list: [],
            });
            next[catIndex] = { ...next[catIndex], pakets };
            return next;
        });
    };

    const updatePaket = (catIndex, paketIndex, key, val) => {
        setCategories((prev) => {
            const next = [...prev];
            const pakets = [...(next[catIndex].pakets || [])];
            pakets[paketIndex] = { ...pakets[paketIndex], [key]: val };
            next[catIndex] = { ...next[catIndex], pakets };
            return next;
        });
    };

    const removePaket = (catIndex, paketIndex) => {
        setCategories((prev) => {
            const next = [...prev];
            const pakets = (next[catIndex].pakets || []).filter(
                (_, i) => i !== paketIndex,
            );
            next[catIndex] = { ...next[catIndex], pakets };
            return next;
        });
    };

    const addListItem = (catIndex, paketIndex) => {
        setCategories((prev) => {
            const next = [...prev];
            const pakets = [...(next[catIndex].pakets || [])];
            const list = [...(pakets[paketIndex].list || [])];
            list.push({
                _id: tempId(),
                id: null,
                item_name: "",
                nominal: null,
            });
            pakets[paketIndex] = { ...pakets[paketIndex], list };
            next[catIndex] = { ...next[catIndex], pakets };
            return next;
        });
    };

    const updateListItem = (catIndex, paketIndex, itemIndex, key, val) => {
        setCategories((prev) => {
            const next = [...prev];
            const pakets = [...(next[catIndex].pakets || [])];
            const list = [...(pakets[paketIndex].list || [])];
            list[itemIndex] = { ...list[itemIndex], [key]: val };
            pakets[paketIndex] = { ...pakets[paketIndex], list };
            next[catIndex] = { ...next[catIndex], pakets };
            return next;
        });
    };

    const removeListItem = (catIndex, paketIndex, itemIndex) => {
        setCategories((prev) => {
            const next = [...prev];
            const pakets = [...(next[catIndex].pakets || [])];
            const list = (pakets[paketIndex].list || []).filter(
                (_, i) => i !== itemIndex,
            );
            pakets[paketIndex] = { ...pakets[paketIndex], list };
            next[catIndex] = { ...next[catIndex], pakets };
            return next;
        });
    };

    const handleSave = async () => {
        if (!selectedBanomId) {
            setError("Pilih service terlebih dahulu");
            return;
        }

        setSaving(true);
        setError(null);

        try {
            const formData = new FormData();

            formData.append("id_banom", selectedBanomId);

            // ==========================
            // Image Services
            // ==========================
            let imageIndex = 0;

            categories
                .filter((cat) => cat._id !== "__uncategorized__")
                .forEach((cat) => {
                    formData.append(
                        `image_services[${imageIndex}][id]`,
                        cat.id ?? "",
                    );

                    formData.append(
                        `image_services[${imageIndex}][_temp_id]`,
                        cat._id,
                    );

                    formData.append(
                        `image_services[${imageIndex}][name]`,
                        cat.name ?? "",
                    );

                    if (cat.image instanceof File) {
                        formData.append(
                            `image_services[${imageIndex}][image]`,
                            cat.image,
                        );
                    } else {
                        formData.append(
                            `image_services[${imageIndex}][image_old]`,
                            cat.image ?? "",
                        );
                    }

                    imageIndex++;
                });

            // ==========================
            // Price Service
            // ==========================

            let itemIndex = 0;

            categories.forEach((cat) => {
                const categoryId =
                    cat._id === "__uncategorized__" ? "" : (cat.id ?? cat._id);

                (cat.pakets || []).forEach((paket) => {
                    formData.append(`items[${itemIndex}][id]`, paket.id ?? "");

                    formData.append(
                        `items[${itemIndex}][id_image_service]`,
                        categoryId,
                    );

                    formData.append(
                        `items[${itemIndex}][paket_name]`,
                        paket.paket_name,
                    );

                    formData.append(
                        `items[${itemIndex}][paket_desc]`,
                        paket.paket_desc,
                    );

                    formData.append(
                        `items[${itemIndex}][populer]`,
                        paket.populer ? 1 : 0,
                    );

                    (paket.list || []).forEach((list, listIndex) => {
                        formData.append(
                            `items[${itemIndex}][list][${listIndex}][id]`,
                            list.id ?? "",
                        );

                        formData.append(
                            `items[${itemIndex}][list][${listIndex}][item_name]`,
                            list.item_name,
                        );

                        formData.append(
                            `items[${itemIndex}][list][${listIndex}][nominal]`,
                            list.nominal ?? "",
                        );
                    });

                    itemIndex++;
                });
            });

            await onSave(formData);
        } catch (err) {
            console.error(err);
            setError(err.message ?? "Gagal menyimpan");
        } finally {
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
                    aria-label="Edit Price"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="bg-white rounded-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-primary-dark">
                            Edit Price
                        </h2>
                        <button
                            onClick={onClose}
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
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Pilih Service
                                </label>
                                <select
                                    value={selectedBanomId || ""}
                                    onChange={(e) =>
                                        setSelectedBanomId(
                                            e.target.value
                                                ? parseInt(e.target.value)
                                                : null,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                >
                                    <option value="">
                                        -- Pilih Service --
                                    </option>
                                    {services.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedBanomId && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-gray-700">
                                            Kategori Paket
                                        </h3>
                                        <motion.button
                                            type="button"
                                            onClick={addCategory}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-xs px-3 py-1.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-light"
                                        >
                                            + Tambah Kategori
                                        </motion.button>
                                    </div>

                                    {categories.map((cat, ci) => (
                                        <div
                                            key={cat._id}
                                            className="border border-gray-200 rounded-xl p-4 space-y-4"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 space-y-3">
                                                    {cat._id ===
                                                    "__uncategorized__" ? (
                                                        <p className="text-sm font-semibold text-gray-500 italic">
                                                            {cat.name}
                                                        </p>
                                                    ) : (
                                                        <>
                                                            <input
                                                                type="text"
                                                                value={cat.name}
                                                                onChange={(e) =>
                                                                    updateCategory(
                                                                        ci,
                                                                        "name",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                placeholder="Nama Kategori"
                                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                            />
                                                            <ImageInput
                                                                value={
                                                                    cat.image
                                                                }
                                                                onChange={(
                                                                    file,
                                                                ) =>
                                                                    updateCategory(
                                                                        ci,
                                                                        "image",
                                                                        file,
                                                                    )
                                                                }
                                                                label="Gambar Kategori"
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                                {cat._id !==
                                                    "__uncategorized__" && (
                                                    <button
                                                        onClick={() =>
                                                            removeCategory(ci)
                                                        }
                                                        className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs hover:bg-red-200 shrink-0"
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>

                                            <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-medium text-gray-500">
                                                        Paket Harga
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            addPaket(ci)
                                                        }
                                                        className="text-xs text-primary font-medium hover:underline"
                                                    >
                                                        + Tambah Paket
                                                    </button>
                                                </div>

                                                {cat.pakets.map((paket, pi) => (
                                                    <div
                                                        key={paket._id}
                                                        className="border border-gray-100 rounded-lg p-3 space-y-2"
                                                    >
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="flex-1 space-y-2">
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        paket.paket_name
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updatePaket(
                                                                            ci,
                                                                            pi,
                                                                            "paket_name",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder="Nama Paket"
                                                                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                                />
                                                                <textarea
                                                                    value={
                                                                        paket.paket_desc
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updatePaket(
                                                                            ci,
                                                                            pi,
                                                                            "paket_desc",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder="Deskripsi Paket"
                                                                    rows={2}
                                                                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                                />
                                                                <label className="flex items-center gap-2 cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={
                                                                            paket.populer ||
                                                                            false
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            updatePaket(
                                                                                ci,
                                                                                pi,
                                                                                "populer",
                                                                                e
                                                                                    .target
                                                                                    .checked,
                                                                            )
                                                                        }
                                                                        className="w-3.5 h-3.5 rounded border-gray-300 text-primary focus:ring-primary/30"
                                                                    />
                                                                    <span className="text-xs font-medium text-gray-600">
                                                                        Paket
                                                                        Populer
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <button
                                                                onClick={() =>
                                                                    removePaket(
                                                                        ci,
                                                                        pi,
                                                                    )
                                                                }
                                                                className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs hover:bg-red-200 shrink-0"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>

                                                        <div className="pl-3 border-l-2 border-gray-100 space-y-1.5">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-[11px] font-medium text-gray-400">
                                                                    Daftar Item
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        addListItem(
                                                                            ci,
                                                                            pi,
                                                                        )
                                                                    }
                                                                    className="text-[11px] text-primary font-medium hover:underline"
                                                                >
                                                                    + Item
                                                                </button>
                                                            </div>
                                                            {(
                                                                paket.list || []
                                                            ).map(
                                                                (item, ii) => (
                                                                    <div
                                                                        key={
                                                                            item._id
                                                                        }
                                                                        className="flex items-center gap-1.5"
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            value={
                                                                                item.item_name
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                updateListItem(
                                                                                    ci,
                                                                                    pi,
                                                                                    ii,
                                                                                    "item_name",
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            placeholder="Nama Item"
                                                                            className="flex-1 px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                                        />
                                                                        <button
                                                                            onClick={() =>
                                                                                removeListItem(
                                                                                    ci,
                                                                                    pi,
                                                                                    ii,
                                                                                )
                                                                            }
                                                                            className="w-4 h-4 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-[10px] hover:bg-red-200 shrink-0"
                                                                        >
                                                                            ✕
                                                                        </button>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Batal
                        </button>
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
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
