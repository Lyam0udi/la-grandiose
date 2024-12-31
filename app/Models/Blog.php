<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['category_id', 'slug', 'image', 'post_date'];
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
     * Ensure the slug is unique and properly formatted when saving.
     */
    public static function boot()
    {
        parent::boot();

        // Automatically generate slug if not provided
        static::saving(function ($blog) {
            // If the slug doesn't exist, create it based on the title
            if (empty($blog->slug)) {
                $locale = app()->getLocale();
                $title = $blog->getTranslation($locale)?->title ?? 'blog-' . $blog->id;
                $blog->slug = \Str::slug($title);
            }
        });

        // After saving the blog, fix the slug if it contains '-tmp'
        static::saved(function ($blog) {
            // If the slug contains '-tmp', replace it with '-blogid'
            if (str_contains($blog->slug, '-tmp')) {
                $blog->slug = preg_replace('/-tmp$/', '-' . $blog->id, $blog->slug);
                $blog->save();  // Save again to update the slug in the database
            }
        });
    }
}
