<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('galeries', function (Blueprint $table) {
            $table->unsignedBigInteger('project_id')->nullable()->after('id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->text('image')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('galeries', function (Blueprint $table) {
            $table->dropForeign(['project_id']);
            $table->dropColumn('project_id');
            $table->string('image')->change();
        });
    }
};
