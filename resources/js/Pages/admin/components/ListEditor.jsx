import { motion } from "framer-motion";
import ImageInput from "./ImageInput.jsx";
import heic2any from "heic2any";

export default function ListEditor({
    items = [],
    onChange,
    fields = [],
    title,
    max,
}) {
    const MAX_ITEMS = max ? max : 20;
    const isMaxReached = items.length >= MAX_ITEMS;

    const handleFileChange = async (e, index, key) => {
        let file = e.target.files[0];
        if (!file) return;

        // 1. Cek dan Konversi jika file adalah HEIC
        if (
            file.name.toLowerCase().endsWith(".heic") ||
            file.type === "image/heic"
        ) {
            try {
                // Tampilkan loading sementara jika perlu
                const convertedBlob = await heic2any({
                    blob: file,
                    toType: "image/jpeg",
                    quality: 0.8,
                });

                file = new File(
                    [convertedBlob],
                    file.name.replace(/\.[^/.]+$/, "") + ".jpg",
                    { type: "image/jpeg" },
                );
            } catch (error) {
                console.error("Gagal mengonversi HEIC di ListEditor:", error);
                alert(
                    "Gagal memproses gambar HEIC, silakan gunakan format lain.",
                );
                return;
            }
        }

        // 2. Buat Preview URL agar langsung tampil di browser (PENTING!)
        const previewUrl = URL.createObjectURL(file);

        // 3. Update state items (sesuaikan dengan cara ListEditor kamu memperbarui data)
        const updatedItems = [...items];
        updatedItems[index] = {
            ...updatedItems[index],
            [key]: file, // Simpan objek File asli untuk dikirim ke backend
            [`${key}_preview`]: previewUrl, // Simpan string blob URL untuk tag <img src="..." />
        };

        onChange(updatedItems);
    };

    const addItem = () => {
        if (isMaxReached) return;

        const empty = {};
        fields.forEach((f) => {
            if (f.type === "image" && f.multiple) {
                empty[f.key] = [];
            } else {
                empty[f.key] = f.default ?? "";
            }
        });
        onChange([...items, empty]);
    };

    const updateItem = (index, key, val) => {
        const updated = items.map((item, i) =>
            i === index ? { ...item, [key]: val } : item,
        );
        onChange(updated);
    };

    const removeItem = (index) => {
        onChange(items.filter((_, i) => i !== index));
    };

    // FITUR UX TAMBAHAN: Geser posisi item ke atas
    const moveUp = (index) => {
        if (index === 0) return; // Sudah paling atas
        const updated = [...items];
        const temp = updated[index];
        updated[index] = updated[index - 1];
        updated[index - 1] = temp;
        onChange(updated);
    };

    // FITUR UX TAMBAHAN: Geser posisi item ke bawah
    const moveDown = (index) => {
        if (index === items.length - 1) return; // Sudah paling bawah
        const updated = [...items];
        const temp = updated[index];
        updated[index] = updated[index + 1];
        updated[index + 1] = temp;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            {title && (
                <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-gray-700">
                        {title}
                    </label>
                    <span className="text-xs text-gray-400 font-medium">
                        ({items.length}/{MAX_ITEMS})
                    </span>
                </div>
            )}

            {items.map((item, i) => (
                <div
                    key={i}
                    className="p-4 border border-gray-200 rounded-xl bg-gray-50/70 space-y-3 shadow-sm relative group"
                >
                    <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Item {i + 1}
                        </span>
                        <div className="flex items-center gap-3">
                            {/* Tombol Sortir Urutan Posisi */}
                            <div className="flex items-center bg-white border border-gray-200 rounded-md overflow-hidden">
                                <motion.button
                                    type="button"
                                    onClick={() => moveUp(i)}
                                    disabled={i === 0}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent text-xs"
                                    title="Pindahkan ke atas"
                                >
                                    🔼
                                </motion.button>
                                <div className="w-px h-3 bg-gray-200" />
                                <motion.button
                                    type="button"
                                    onClick={() => moveDown(i)}
                                    disabled={i === items.length - 1}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent text-xs"
                                    title="Pindahkan ke bawah"
                                >
                                    🔽
                                </motion.button>
                            </div>

                            {/* Tombol Hapus */}
                            <motion.button
                                type="button"
                                onClick={() => removeItem(i)}
                                whileTap={{ scale: 0.9 }}
                                className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
                            >
                                Hapus
                            </motion.button>
                        </div>
                    </div>

                    {fields.map((field) => (
                        <div key={field.key} className="space-y-1">
                            {field.type === "image" && field.multiple ? (
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        {field.label}
                                    </label>
                                    <div className="space-y-2">
                                        {Array.isArray(item[field.key]) &&
                                            item[field.key].map(
                                                (img, imgIdx) => (
                                                    <div
                                                        key={imgIdx}
                                                        className="flex items-start gap-2"
                                                    >
                                                        <div className="flex-1">
                                                            <ImageInput
                                                                value={img}
                                                                onChange={(
                                                                    val,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...(item[
                                                                                field
                                                                                    .key
                                                                            ] ||
                                                                                []),
                                                                        ];
                                                                    if (
                                                                        val ===
                                                                            "" ||
                                                                        val ===
                                                                            null
                                                                    ) {
                                                                        updated.splice(
                                                                            imgIdx,
                                                                            1,
                                                                        );
                                                                    } else {
                                                                        updated[
                                                                            imgIdx
                                                                        ] = val;
                                                                    }
                                                                    updateItem(
                                                                        i,
                                                                        field.key,
                                                                        updated,
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const updated =
                                                                    [
                                                                        ...(item[
                                                                            field
                                                                                .key
                                                                        ] ||
                                                                            []),
                                                                    ];
                                                                updated.splice(
                                                                    imgIdx,
                                                                    1,
                                                                );
                                                                updateItem(
                                                                    i,
                                                                    field.key,
                                                                    updated,
                                                                );
                                                            }}
                                                            className="mt-7 text-xs text-red-500 hover:text-red-700 font-semibold shrink-0"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                ),
                                            )}
                                    </div>
                                    {(!Array.isArray(item[field.key]) ||
                                        item[field.key].length <
                                            (field.maxItems || 10)) && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = [
                                                    ...(item[field.key] || []),
                                                    "",
                                                ];
                                                updateItem(
                                                    i,
                                                    field.key,
                                                    updated,
                                                );
                                            }}
                                            className="w-full py-1.5 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:border-primary hover:text-primary transition-colors"
                                        >
                                            + Tambah Gambar
                                        </button>
                                    )}
                                </div>
                            ) : field.type === "image" ? (
                                <div>
                                    <ImageInput
                                        label={field.label}
                                        value={item[field.key] || ""}
                                        onChange={(val) =>
                                            updateItem(i, field.key, val)
                                        }
                                    />
                                </div>
                            ) : field.type === "video" ? (
                                <div>
                                    <ImageInput
                                        label={field.label}
                                        value={item[field.key] || ""}
                                        onChange={(val) =>
                                            updateItem(i, field.key, val)
                                        }
                                        accept="video/*"
                                    />
                                </div>
                            ) : field.type === "textarea" ? (
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">
                                        {field.label}
                                    </label>
                                    <textarea
                                        value={item[field.key] || ""}
                                        onChange={(e) =>
                                            updateItem(
                                                i,
                                                field.key,
                                                e.target.value,
                                            )
                                        }
                                        rows={field.rows || 3}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                    />
                                </div>
                            ) : field.type === "color" ? (
                                <div className="flex items-center gap-3 py-1">
                                    <label className="text-xs font-medium text-gray-500">
                                        {field.label}
                                    </label>
                                    <input
                                        type="color"
                                        value={item[field.key] || "#000000"}
                                        onChange={(e) =>
                                            updateItem(
                                                i,
                                                field.key,
                                                e.target.value,
                                            )
                                        }
                                        className="w-8 h-8 rounded-md cursor-pointer border border-gray-200 block shadow-sm"
                                    />
                                </div>
                            ) : field.type === "select" ? (
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">
                                        {field.label}
                                    </label>
                                    <select
                                        value={item[field.key] || ""}
                                        onChange={(e) =>
                                            updateItem(
                                                i,
                                                field.key,
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-shadow"
                                    >
                                        <option value="" disabled>
                                            -- Pilih {field.label} --
                                        </option>
                                        {field.options?.map((opt, idx) => (
                                            <option
                                                key={idx}
                                                value={
                                                    typeof opt === "object"
                                                        ? opt.value
                                                        : opt
                                                }
                                            >
                                                {typeof opt === "object"
                                                    ? opt.label
                                                    : opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type || "text"}
                                        value={item[field.key] || ""}
                                        onChange={(e) =>
                                            updateItem(
                                                i,
                                                field.key,
                                                e.target.value,
                                            )
                                        }
                                        placeholder={field.placeholder}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}

            <motion.button
                type="button"
                onClick={addItem}
                disabled={isMaxReached}
                whileTap={isMaxReached ? {} : { scale: 0.98 }}
                className={`w-full py-2.5 border-2 border-dashed rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isMaxReached
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-[0.99]"
                }`}
            >
                {isMaxReached
                    ? "⚠️ Batas Maksimal Tercapai (6 Item)"
                    : "+ Tambah Item Baru"}
            </motion.button>
        </div>
    );
}
