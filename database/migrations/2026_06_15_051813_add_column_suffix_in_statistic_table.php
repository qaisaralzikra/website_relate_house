<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use PHPUnit\Metadata\After;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('statistiks', function (Blueprint $table) {
            $table->string('suffix', 255)->nullable()->after('value');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('statistiks', function (Blueprint $table) {
            $table->dropColumn('suffix');
        });
    }
};
