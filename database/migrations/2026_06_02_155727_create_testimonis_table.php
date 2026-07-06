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
        Schema::create('testimonis', function (Blueprint $table) {
            $table->id();
            $table->string('nama')->nullable();
            $table->string('image')->nullable();
            $table->string('event')->nullable();
            $table->string('review')->nullable();
            $table->string('jabatan')->nullable();
            $table->string('rating')->nullable();
            $table->string('from_color')->nullable();
            $table->string('to_color')->nullable();
            $table->string('deg_color')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonis');
    }
};
