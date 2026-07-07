<?php
// Paksa hapus file cache view Laravel secara manual di server
$cachedViewsDirectory = __DIR__ . '/../storage/framework/views';

if (is_dir($cachedViewsDirectory)) {
    foreach (glob($cachedViewsDirectory . '/*') as $file) {
        if (is_file($file)) {
            unlink($file);
        }
    }
    echo "Semua cache view berhasil dihapus secara manual!<br>";
} else {
    echo "Folder cache tidak ditemukan.<br>";
}

echo "<a href='/'>Kembali ke Halaman Utama</a>";