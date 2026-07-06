export default function GradientPicker({ value, onChange, label }) {
    // 1. Ubah key 'angle' menjadi 'deg' sesuai kebutuhan Laravel
    const currentFrom = value?.from || "#3B7303";
    const currentVia = value?.via || "#2d5a02";
    const currentTo = value?.to || "#FCA34B";
    const currentDeg = value?.deg !== undefined ? value.deg : 135; // Simpan sebagai angka murni

    const update = (key, val) => {
        if (typeof onChange === "function") {
            onChange({
                ...value,
                from: currentFrom,
                via: currentVia,
                to: currentTo,
                deg: currentDeg, // Menggunakan properti 'deg'
                [key]: val, // Mengganti dengan nilai input baru
            });
        }
    };

    return (
        <div className="space-y-3">
            {label && (
                <label className="block text-sm font-semibold text-gray-700">
                    {label}
                </label>
            )}

            <div className="flex gap-3 items-start flex-wrap">
                <div className="space-y-1">
                    <label className="text-xs text-gray-500">From</label>
                    <input
                        type="color"
                        value={currentFrom}
                        onChange={(e) => update("from", e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 block"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs text-gray-500">Via</label>
                    <input
                        type="color"
                        value={currentVia}
                        onChange={(e) => update("via", e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 block"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs text-gray-500">To</label>
                    <input
                        type="color"
                        value={currentTo}
                        onChange={(e) => update("to", e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 block"
                    />
                </div>

                <div className="space-y-1 min-w-[120px]">
                    {/* Tampilkan teks derajat dengan simbol ° */}
                    <label className="text-xs text-gray-500 font-medium">
                        Angle: {currentDeg}°
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={currentDeg}
                        // Kirim angka murni (Gunakan parseInt agar bertipe number, bukan string)
                        onChange={(e) =>
                            update("deg", parseInt(e.target.value))
                        }
                        className="w-full accent-primary cursor-pointer"
                    />
                </div>
            </div>

            {/* Preview Gradient - tambahkan string 'deg' khusus untuk keperluan style CSS */}
            <div
                className="h-9 rounded-lg border border-gray-200 shadow-sm transition-all duration-200"
                style={{
                    background: `linear-gradient(${currentDeg}deg, ${currentFrom}, ${currentVia}, ${currentTo})`,
                }}
            />
        </div>
    );
}
