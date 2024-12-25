<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cycle extends Model
{
    // Fillable properties
    protected $fillable = ['photo', 'duration', 'age_range'];

    // Casting data types for attributes
    protected $casts = [
        'duration' => 'integer',
        'age_range' => 'integer',
    ];

    // Define the relationship with CycleTranslation
    public function translations()
    {
        return $this->hasMany(CycleTranslation::class);
    }

    // Accessor for 'photo' to get the full URL path
    public function getPhotoUrlAttribute()
    {
        return $this->photo ? asset('storage/' . $this->photo) : null;
    }
}
