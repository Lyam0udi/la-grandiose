<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cycle extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'photo',
        'more_details',
        'level_range',
        'duration',
        'age_range',
    ];

    protected $casts = [
        'name' => 'array', // For translations
        'description' => 'array', // For translations
        'more_details' => 'array', // Array of points
    ];
}

