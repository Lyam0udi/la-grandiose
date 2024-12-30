<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryTranslation extends Model
{
    public $timestamps = true; // Enable created_at and updated_at

    // Allow mass assignment for these fields (without 'slug')
    protected $fillable = ['category_id', 'locale', 'name'];

    /**
     * Relationship: A translation belongs to a category.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
