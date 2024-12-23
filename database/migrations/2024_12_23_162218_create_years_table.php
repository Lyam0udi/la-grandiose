<?php

// database/migrations/xxxx_xx_xx_create_years_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateYearsTable extends Migration
{
    public function up()
    {
        Schema::create('years', function (Blueprint $table) {
            $table->id();
            $table->integer('year'); // Store the year as an integer
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('years');
    }
}
