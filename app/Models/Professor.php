<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    protected $fillable = ['photo'];

    public function translations()
    {
        return $this->hasMany(ProfessorTranslation::class);
    }
}
