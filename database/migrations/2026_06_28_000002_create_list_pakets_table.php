<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('list_pakets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_price_service')->constrained('price_services')->cascadeOnDelete();
            $table->string('item_name');
            // $table->bigInteger('nominal')->nullable();
            // $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('list_pakets');
    }
};
