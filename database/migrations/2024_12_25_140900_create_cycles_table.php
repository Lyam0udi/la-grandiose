<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCyclesTable extends Migration
{
    public function up()
    {
        Schema::create('cycles', function (Blueprint $table) {
            $table->id();
            $table->string('photo')->nullable(); // File path for the cycle's photo
            $table->integer('duration'); // Duration of the cycle (in years, for example)
            $table->integer('age_range'); // Minimum age for the cycle
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cycles');
    }
}
