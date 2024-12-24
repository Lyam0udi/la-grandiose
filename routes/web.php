<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YearController;
use Inertia\Inertia;
use App\Models\Year;
use App\Http\Controllers\ProfessorController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    // Fetch the current year (assuming you have a Year model that holds the year)
    $year = Year::first(); // Or fetch it the way it suits your project

    return Inertia::render('Dashboard', [
        'year' => $year ? $year->year : 'No Year Set',
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Routes for Year management
Route::middleware(['auth'])->group(function () {
    Route::get('/year', [YearController::class, 'show'])->name('year.show');  // Use 'show' method instead of 'index'
    Route::post('/year', [YearController::class, 'update'])->name('year.update');  // For updating the year
});

Route::middleware(['auth'])->group(function () {
    Route::get('/professors', [ProfessorController::class, 'index'])->name('professor.index');
    Route::get('/professors/create', [ProfessorController::class, 'create'])->name('professor.create');
    Route::post('/professors', [ProfessorController::class, 'store'])->name('professor.store');
    Route::get('/professors/{professor}/edit', [ProfessorController::class, 'edit'])->name('professor.edit');
    Route::put('/professors/{professor}', [ProfessorController::class, 'update'])->name('professor.update');
    Route::delete('/professors/{professor}', [ProfessorController::class, 'destroy'])->name('professor.destroy');
});


require __DIR__.'/auth.php';
