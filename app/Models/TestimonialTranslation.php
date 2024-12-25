<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestimonialTranslation extends Model
{
    use HasFactory;

    // Fillable attributes to match the data structure
    protected $fillable = ['testimonial_id', 'locale', 'name', 'description'];

    // Relationship to the Testimonial model
    public function testimonial()
    {
        return $this->belongsTo(Testimonial::class);
    }
}
