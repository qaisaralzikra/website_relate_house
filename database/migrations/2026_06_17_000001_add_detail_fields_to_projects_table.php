<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('guest_count')->nullable()->after('sub_kategori');
            $table->string('location')->nullable()->after('guest_count');
            $table->string('preparation_time')->nullable()->after('location');
            $table->text('challenge')->nullable()->after('preparation_time');
            $table->text('solution')->nullable()->after('challenge');
            $table->text('results')->nullable()->after('solution');
            $table->string('video')->nullable()->after('results');
            $table->boolean('is_featured')->default(false)->after('video');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'guest_count', 'location', 'preparation_time',
                'challenge', 'solution', 'results',
                'video', 'is_featured',
            ]);
        });
    }
};
