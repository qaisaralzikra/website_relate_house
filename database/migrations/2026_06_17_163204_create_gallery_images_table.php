<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('galery_id')->constrained()->cascadeOnDelete();
            $table->string('image');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Copy existing image data to new table
        $rows = DB::table('galeries')->whereNotNull('image')->get();
        foreach ($rows as $row) {
            DB::table('gallery_images')->insert([
                'galery_id'  => $row->id,
                'image'      => $row->image,
                'sort_order' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        Schema::table('galeries', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }

    public function down(): void
    {
        Schema::table('galeries', function (Blueprint $table) {
            $table->string('image')->nullable()->after('label');
        });

        DB::statement('
            UPDATE galeries g
            SET g.image = (
                SELECT gi.image FROM gallery_images gi
                WHERE gi.galery_id = g.id
                ORDER BY gi.sort_order ASC
                LIMIT 1
            )
        ');

        Schema::dropIfExists('gallery_images');
    }
};
