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
        Schema::table('banoms', function (Blueprint $table) {
            // Menambahkan ->change() di akhir untuk mengubah tipe data kolom yang sudah ada
            $table->text('desc')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('banoms', function (Blueprint $table) {
            // Menambahkan ->change() di akhir untuk mengubah tipe data kolom yang sudah ada
            $table->string('desc')->nullable()->change();
        });
    }
};
