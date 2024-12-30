<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('slug')->unique(); // URL-friendly identifier
            $table->timestamps(); // created_at and updated_at
            $table->softDeletes(); // deleted_at for soft deletion
        });
    }

    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
