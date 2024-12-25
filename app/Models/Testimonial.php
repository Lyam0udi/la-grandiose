<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    // Updated to match the field names and the data structure sent from the front-end
    protected $fillable = ['emoticon', 'is_student'];

    // Relationship with TestimonialTranslation
    public function translations()
    {
        return $this->hasMany(TestimonialTranslation::class);
    }

    // Fetch translation for a given locale
    public function translation($locale = null)
    {
        $locale = $locale ?? app()->getLocale(); // Default to current app locale

        return $this->translations->where('locale', $locale)->first();
    }
}
