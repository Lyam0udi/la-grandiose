<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CycleTranslation extends Model
{
    // Fillable properties
    protected $fillable = ['locale', 'name', 'description', 'points'];

    // Cast attributes to ensure correct data types
    protected $casts = [
        'locale' => 'string',
    ];

    // Define the inverse relationship to the Cycle model
    public function cycle()
    {
        return $this->belongsTo(Cycle::class);
    }
}
