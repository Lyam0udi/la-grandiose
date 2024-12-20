<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create the 'admin' and 'user' roles
        Role::updateOrCreate(
            ['name' => 'admin'],
            ['name' => 'admin']
        );

        Role::updateOrCreate(
            ['name' => 'user'],
            ['name' => 'user']
        );
    }
}
