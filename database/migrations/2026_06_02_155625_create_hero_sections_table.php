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
        Schema::create('hero_sections', function (Blueprint $table) {
            $table->id();
            $table->string('badge')->nullable();
            $table->string('title')->nullable();
            $table->string('titleHighlight')->nullable();
            $table->string('subtitle')->nullable();
            $table->string('from_color')->nullable();
            $table->string('via_color')->nullable();
            $table->string('to_color')->nullable();
            $table->string('deg_color')->nullable();
            $table->boolean('showScrollIndicator')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_sections');
    }
};
