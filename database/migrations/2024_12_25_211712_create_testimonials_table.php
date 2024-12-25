<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestimonialsTable extends Migration
{
    public function up()
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('emoticon')->nullable();  // Store emoticons
            $table->boolean('is_student')->default(true); // True for student, false for parent
            $table->timestamps(); // Adds created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('testimonials');
    }
}
