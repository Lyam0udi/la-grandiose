<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YearController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\CycleController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BlogController;


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
Route::get('/api/professors/landing', [ProfessorController::class, 'getProfessorsForLandingPage']);
Route::get('/api/testimonials/landing', [TestimonialController::class, 'getTestimonialsForLandingPage']);


Route::get('/inscription', function () {
    return Inertia::render('Inscription', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('inscription');

// Route::get('/blog', function () {
//     return Inertia::render('Blog', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//     ]);
// })->name('blog');
Route::get('blog', [BlogController::class, 'blogIndex'])->name('blog.index');
Route::get('api/blogs', [BlogController::class, 'blogData'])->name('api.blogs');
Route::get('blog/{slug}', [BlogController::class, 'blogDetails'])->name('blog.details'); // For Inertia view
Route::get('api/blog/{slug}', [BlogController::class, 'blogDetailsData'])->name('api.blog.details'); // For API data



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

// Routes for Cycle management (similar to professor routes)
Route::middleware(['auth'])->group(function () {
    Route::get('/cycles', [CycleController::class, 'index'])->name('cycle.index'); // List all cycles
    Route::get('/cycles/create', [CycleController::class, 'create'])->name('cycle.create'); // Form to create a cycle
    Route::post('/cycles', [CycleController::class, 'store'])->name('cycle.store'); // Store new cycle
    Route::get('/cycles/{cycle}/edit', [CycleController::class, 'edit'])->name('cycle.edit'); // Edit cycle form
    Route::put('/cycles/{cycle}', [CycleController::class, 'update'])->name('cycle.update'); // Update cycle
    Route::delete('/cycles/{cycle}', [CycleController::class, 'destroy'])->name('cycle.destroy'); // Delete cycle
});

Route::middleware(['auth'])->group(function () {
    Route::get('testimonials', [TestimonialController::class, 'index'])->name('testimonials.index');
    Route::get('testimonials/create', [TestimonialController::class, 'create'])->name('testimonials.create');
    Route::post('testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
    Route::get('testimonials/{testimonial}/edit', [TestimonialController::class, 'edit'])->name('testimonials.edit');
    Route::put('testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('testimonials.update');
    Route::delete('testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::get('categories/checkSlug', [CategoryController::class, 'checkSlug'])->name('categories.checkSlug');

});

Route::middleware(['auth'])->group(function () {
    Route::get('blogs', [BlogController::class, 'index'])->name('blogs.index');
    Route::get('blogs/create', [BlogController::class, 'create'])->name('blogs.create');
    Route::post('blogs', [BlogController::class, 'store'])->name('blogs.store');
    Route::get('blogs/{blog}/edit', [BlogController::class, 'edit'])->name('blogs.edit');
    Route::put('blogs/{blog}', [BlogController::class, 'update'])->name('blogs.update');
    Route::delete('blogs/{blog}', [BlogController::class, 'destroy'])->name('blogs.destroy');
    Route::get('blogs/checkSlug', [CategoryController::class, 'checkSlug'])->name('blogs.checkSlug');
});


require __DIR__.'/auth.php';
