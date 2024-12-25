<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('cycles', function (Blueprint $table) {
            $table->id();
            $table->json('name'); // Store translations as JSON
            $table->json('description'); // Store translations as JSON
            $table->string('photo')->nullable();
            $table->json('more_details')->nullable(); // Array of translated points
            $table->string('level_range');
            $table->integer('duration');
            $table->string('age_range');
            $table->timestamps(); // created_at and updated_at
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cycles');
    }
};
