<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YearController;
use App\Http\Controllers\ProfessorController;
use Inertia\Inertia;
use App\Models\Year;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $year = Year::first(); // Fetch the current year, if available
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
    Route::get('/year', [YearController::class, 'show'])->name('year.show');  // Show the year management page
    Route::post('/year', [YearController::class, 'update'])->name('year.update');  // Update the year
});

// Routes for Professor management
Route::middleware(['auth'])->group(function () {
    Route::get('/professors', [ProfessorController::class, 'index'])->name('professor.index'); // List all professors
    Route::get('/professors/create', [ProfessorController::class, 'create'])->name('professor.create'); // Form to create
    Route::post('/professors', [ProfessorController::class, 'store'])->name('professor.store'); // Store new professor
    Route::get('/professors/{professor}/edit', [ProfessorController::class, 'edit'])->name('professor.edit'); // Edit form
    Route::put('/professors/{professor}', [ProfessorController::class, 'update'])->name('professor.update'); // Update professor
    Route::delete('/professors/{professor}', [ProfessorController::class, 'destroy'])->name('professor.destroy'); // Delete professor
});

Route::resource('cycles', CycleController::class);


require __DIR__.'/auth.php';
