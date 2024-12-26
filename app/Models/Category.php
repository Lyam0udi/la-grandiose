<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [];
    protected $with = ['translations'];

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }

    public function translations()
    {
        return $this->hasMany(CategoryTranslation::class);
    }
}
