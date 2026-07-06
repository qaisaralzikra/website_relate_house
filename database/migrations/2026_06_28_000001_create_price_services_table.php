<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('price_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_banom')->constrained('banoms')->cascadeOnDelete();
            $table->string('paket_name');
            $table->text('paket_desc')->nullable();
            $table->string('image_paket')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('price_services');
    }
};
