<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function compressAll()
    {
        // 1. Ambil semua file yang ada di storage/app/public (termasuk di dalam subfolder)
        $allFiles = Storage::disk('public')->allFiles();

        $compressedCount = 0;
        $skippedCount = 0;
        $processedFiles = [];

        // Batasi waktu eksekusi PHP agar tidak timeout saat memproses banyak gambar
        ini_set('max_execution_time', 300); // 5 Menit

        foreach ($allFiles as $filename) {
            $path = Storage::disk('public')->path($filename);

            // 2. Ambil info tipe file, gunakan @ untuk menghindari error jika file rusak/bukan gambar
            $info = @getimagesize($path);
            if (!$info) {
                $skippedCount++;
                continue; // Lewati jika file bukan gambar (misal file .txt, .pdf, .mp4)
            }

            $mime = $info['mime'];
            $image = null;

            // 3. Proses Kompresi berdasarkan Mime Type (Menimpa file asli)
            switch ($mime) {
                case 'image/jpeg':
                    $image = @imagecreatefromjpeg($path);
                    if ($image) {
                        imagejpeg($image, $path, 50); // Kualitas 50%
                    }
                    break;

                case 'image/png':
                    $image = @imagecreatefrompng($path);
                    if ($image) {
                        imagealphablending($image, false);
                        imagesavealpha($image, true);
                        imagepng($image, $path, 6); // Kompresi tingkat 6
                    }
                    break;

                case 'image/webp':
                    $image = @imagecreatefromwebp($path);
                    if ($image) {
                        imagewebp($image, $path, 50); // Kualitas 50%
                    }
                    break;

                default:
                    $skippedCount++;
                    continue 2; // Lewati format gambar lain yang tidak didukung GD bawaan
            }

            // 4. Bersihkan memori per-gambar setelah selesai dikompres
            if ($image && is_resource($image)) {
                imagedestroy($image);
            }

            $compressedCount++;
            $processedFiles[] = [
                'filename' => $filename,
                'url' => asset('storage/' . $filename)
            ];
        }

        // 5. Kembalikan respon total file yang berhasil diproses
        return response()->json([
            'status' => 'success',
            'message' => 'Proses kompresi masal selesai!',
            'summary' => [
                'total_berhasil_dikompres' => $compressedCount,
                'total_bukan_gambar_dilewati' => $skippedCount,
            ],
            'files' => $processedFiles
        ]);
    }
}
