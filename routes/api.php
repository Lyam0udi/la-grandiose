<?php

use App\Models\Cycle;
use Illuminate\Http\Request;

// Example API route
Route::get('/cycles', function () {
    return Cycle::all();  // Returns all cycles from the database
});
