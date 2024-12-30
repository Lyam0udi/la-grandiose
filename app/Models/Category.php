<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    // Allow mass assignment for these fields
    protected $fillable = ['slug'];

    /**
     * Relationship: A category has many translations.
     */
    public function translations()
    {
        return $this->hasMany(CategoryTranslation::class);
    }

    /**
     * Relationship: A category has many blogs.
     */
    public function blogs()
    {
        return $this->hasMany(Blog::class);  // Assuming the Blog model has a category_id field
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
        static::saving(function ($category) {
            // If the slug doesn't exist, create it based on the name
            if (empty($category->slug)) {
                $category->slug = \Str::slug($category->getTranslation(app()->getLocale())?->name ?? 'category-' . $category->id);
            }
        });

        // After saving the category, fix the slug if it contains '-tmp'
        static::saved(function ($category) {
            // If the slug contains '-tmp', replace it with '-categoryid'
            if (str_contains($category->slug, '-tmp')) {
                $category->slug = preg_replace('/-tmp$/', '-' . $category->id, $category->slug);
                $category->save();  // Save again to update the slug in the database
            }
        });
    }
}
