<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('about_sections', function (Blueprint $table) {
            // Menambahkan ->change() di akhir untuk mengubah tipe data kolom yang sudah ada
            $table->text('desc_1')->nullable()->change();
            $table->text('desc_2')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('about_sections', function (Blueprint $table) {
            // Kembalikan ke tipe data semula (misal string/varchar) jika di-rollback
            $table->string('desc_1')->nullable()->change();
            $table->string('desc_2')->nullable()->change();
        });
    }
};
