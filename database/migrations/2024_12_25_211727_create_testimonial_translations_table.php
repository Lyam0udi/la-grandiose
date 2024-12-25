<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestimonialTranslationsTable extends Migration
{
    public function up()
    {
        Schema::create('testimonial_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('testimonial_id');
            $table->string('locale'); // Language code (e.g., 'en', 'fr')
            $table->string('name');
            $table->text('description');
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('testimonial_id')->references('id')->on('testimonials')->onDelete('cascade');

            // Ensure unique translations for a testimonial in a specific locale
            $table->unique(['testimonial_id', 'locale']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('testimonial_translations');
    }
}
