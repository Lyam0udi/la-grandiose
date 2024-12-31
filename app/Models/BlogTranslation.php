<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogTranslation extends Model
{
    use HasFactory;
    public $timestamps = true; // Enable created_at and updated_at


    protected $fillable = ['blog_id', 'locale', 'title', 'content'];

    /**
     * Relationship: A translation belongs to a blog.
     */
    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
    
