<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminSectionController;
use App\Http\Controllers\CtaSectionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/sitemap.xml', [SitemapController::class, 'index']);
Route::get('/login', [AdminController::class, 'login'])->name('login');
Route::post('/login', [AdminController::class, 'loginSubmit']);
Route::get('/', [HomeController::class, 'index']);

Route::get('/clear-cache', function() {
    \Artisan::call('view:clear');
    \Artisan::call('cache:clear');
    return "Cache berhasil dibersihkan! Silakan cek kembali halaman utama.";
});

Route::get('/cek-php', function () {
    phpinfo();
});

Route::post('/logout', [AdminController::class, 'logout']);
Route::post('/cta/send-email', [CtaSectionController::class, 'sendEmail']);
Route::get('/detail/service/{id}', [HomeController::class, 'detailService']);
Route::get('/detail/portfolio/{id}', [HomeController::class, 'detailPortfolio']);

Route::middleware('auth')->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
    Route::post('/admin/section/{section}', [AdminSectionController::class, 'update']);
    Route::post('/admin/gallery/store', [AdminSectionController::class, 'saveGalleryItem']);
    Route::post('/admin/gallery/update/{id}', [AdminSectionController::class, 'updateGalleryItem']);
    Route::post('/admin/gallery/delete/{id}', [AdminSectionController::class, 'deleteGalleryItem']);
});
