<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['category_id', 'slug', 'image'];
    protected $with = ['translations', 'category'];

    /**
     * Relationship: A blog belongs to one category.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Relationship: A blog has many translations.
     */
    public function translations()
    {
        return $this->hasMany(BlogTranslation::class);
    }

    /**
     * Accessor to get the translation for a specific locale.
     */
    public function getTranslation($locale)
    {
        return $this->translations->where('locale', $locale)->first();
    }

    /**
     * Boot method to handle slug replacement logic.
     */
    protected static function boot()
    {
        parent::boot();

        // Handle slug replacement after saving
        static::saved(function ($blog) {
            if (Str::endsWith($blog->slug, '-tmp')) {
                $blog->slug = Str::replaceLast('-tmp', '-' . $blog->id, $blog->slug);
                $blog->saveQuietly(); // Avoid triggering another save event
            }
        });
    }
}
