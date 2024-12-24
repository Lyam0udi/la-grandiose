<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfessorTranslationsTable extends Migration
{
    public function up()
    {
        Schema::create('professor_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('professor_id')->constrained()->onDelete('cascade');
            $table->string('locale'); // e.g., 'en', 'fr', 'es'
            $table->string('name');
            $table->string('study_material');
            $table->text('description');
            $table->timestamps();

            $table->unique(['professor_id', 'locale']); // Unique translation per locale
        });
    }

    public function down()
    {
        Schema::dropIfExists('professor_translations');
    }
}
