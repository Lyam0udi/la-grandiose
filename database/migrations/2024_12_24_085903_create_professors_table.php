<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfessorsTable extends Migration
{
    public function up()
    {
        Schema::create('professors', function (Blueprint $table) {
            $table->id();
            $table->string('photo')->nullable(); // File path for the professor's photo
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('professors');
    }
}
