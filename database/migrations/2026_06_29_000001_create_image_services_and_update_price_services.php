<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('image_services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('image');
            $table->foreignId('id_banom')->constrained('banoms')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::table('price_services', function (Blueprint $table) {
            $table->dropColumn('image_paket');
        });

        Schema::table('price_services', function (Blueprint $table) {
            $table->foreignId('id_image_service')->nullable()->after('id_banom')->constrained('image_services')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('price_services', function (Blueprint $table) {
            $table->dropForeign(['id_image_service']);
            $table->dropColumn('id_image_service');
            $table->string('image_paket')->nullable();
        });

        Schema::dropIfExists('image_services');
    }
};
