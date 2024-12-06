<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CycleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
{
    DB::table('cycles')->insert([
        ['name' => 'Kindergarten'],
        ['name' => 'Primary School']
    ]);
}

}
