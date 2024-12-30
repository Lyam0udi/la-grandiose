<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('category_translations', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('category_id')->constrained()->cascadeOnDelete(); // Foreign key to `categories`
            $table->string('locale')->index(); // Language code (e.g., 'en', 'fr', 'ar')
            $table->string('name'); // Translated name
            $table->timestamps(); // created_at and updated_at

            $table->unique(['category_id', 'locale']); // Ensures one translation per locale per category
        });
    }

    public function down()
    {
        Schema::dropIfExists('category_translations');
    }
};
