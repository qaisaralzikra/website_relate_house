import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function ImageInput({ value, onChange, label, accept }) {
    // Pembantu untuk mendeteksi apakah value merupakan hasil upload (Base64 ATAU Path Storage Lokal)
    const isUploadFormat = (val) => {
        if (!val || typeof val !== "string") return false;
        return (
            val.startsWith("data:") ||
            val.startsWith("/storage/") ||
            val.includes("storage/")
        );
    };

    // 1. Inisialisasi mode dengan deteksi yang lebih luas
    const [mode, setMode] = useState(() => {
        return isUploadFormat(value) ? "upload" : "url";
    });

    const fileRef = useRef(null);

    // 2. Sinkronisasi mode yang akurat saat value dari parent berubah
    useEffect(() => {
        if (value) {
            setMode(isUploadFormat(value) ? "upload" : "url");
        }
    }, [value]);

    const [fileType, setFileType] = useState(() => {
        if (typeof value === "string" && /\.(mp4|webm|ogg|mov|avi)$/i.test(value)) return "video";
        return "image";
    });

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Pengecekan khusus untuk Gambar
        if (file.type.startsWith("image/")) {
            const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
            if (file.size > maxSizeInBytes) {
                alert("Ukuran gambar terlalu besar! Maksimal ukuran file adalah 10 MB.");
                if (fileRef.current) {
                    fileRef.current.value = ""; // Reset input HTML agar user bisa pilih file lain lagi
                }
                return; // Berhenti di sini, jangan panggil onChange
            }
            setFileType("image");
        } else if (file.type.startsWith("video/")) {
            setFileType("video"); // Video lolos tanpa pengecekan ukuran sesuai request
        }
        
        onChange(file);
    };

    const handleRemove = () => {
        onChange("");
        if (fileRef.current) {
            fileRef.current.value = ""; // Reset input file HTML bawaan
        }
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-semibold text-gray-700">
                    {label}
                </label>
            )}

            {/* Tab Switcher */}
            <div className="flex gap-2 mb-2">
                <motion.button
                    type="button"
                    onClick={() => setMode("url")}
                    whileTap={{ scale: 0.95 }}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${mode === "url" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
                >
                    URL
                </motion.button>
                <motion.button
                    type="button"
                    onClick={() => setMode("upload")}
                    whileTap={{ scale: 0.95 }}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${mode === "upload" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
                >
                    Upload
                </motion.button>
            </div>

            {/* Konten Berdasarkan Mode */}
            {mode === "url" ? (
                <input
                    type="text"
                    // Jika isUploadFormat true, kosongkan value text input agar link base64/storage tidak merusak estetika form URL
                    value={
                        !isUploadFormat(value) && typeof value === "string"
                            ? value
                            : ""
                    }
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
            ) : (
                <div>
                    <motion.button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-primary hover:text-primary transition-colors"
                    >
                        {value ? "📸 Ganti file" : "📁 Klik untuk upload"}
                    </motion.button>
                    <input
                        ref={fileRef}
                        type="file"
                        accept={accept || "image/*"}
                        onChange={handleFile}
                        className="hidden"
                    />
                </div>
            )}

            {/* Live Preview Gambar/Video */}
            {value && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200 mt-2">
                    {fileType === "video" ? (
                        <video
                            src={
                                value instanceof File
                                    ? URL.createObjectURL(value)
                                    : `/storage/${value}`
                            }
                            className="w-full h-full object-cover"
                            controls
                        />
                    ) : (
                        <img
                            src={
                                value instanceof File
                                    ? URL.createObjectURL(value)
                                    : `/storage/${value}`
                            }
                            alt="preview"
                            decoding="async"
                            className="w-full h-full object-cover"
                            onError={() => {}}
                        />
                    )}
                    <motion.button
                        type="button"
                        onClick={handleRemove}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-md z-10"
                    >
                        ✕
                    </motion.button>
                </div>
            )}
        </div>
    );
}