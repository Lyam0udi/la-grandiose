<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfessorTranslation extends Model
{
    protected $fillable = ['locale', 'name', 'study_material', 'description'];

    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }
}

