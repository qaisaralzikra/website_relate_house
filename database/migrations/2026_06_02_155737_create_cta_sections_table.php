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
        Schema::create('cta_sections', function (Blueprint $table) {
            $table->id();
            $table->string('media')->nullable();
            $table->string('label')->nullable();
            $table->string('url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('from_color')->nullable();
            $table->string('via_color')->nullable();
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
        Schema::dropIfExists('cta_sections');
    }
};
