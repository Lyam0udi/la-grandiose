<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCycleTranslationsTable extends Migration
{
    public function up()
    {
        Schema::create('cycle_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cycle_id')->constrained()->onDelete('cascade');
            $table->string('locale'); // e.g., 'en', 'fr', 'ar'
            $table->string('name'); // This will hold the cycle name
            $table->text('description')->nullable(); // Description field for cycle
            $table->text('more_details')->nullable(); // Additional details for cycle
            $table->timestamps();

            $table->unique(['cycle_id', 'locale']); // Ensure one translation per locale
        });
    }

    public function down()
    {
        Schema::dropIfExists('cycle_translations');
    }
}
