<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index()
    {
        $categories = Category::with('translations')->get();

        return inertia('CategoryManagement', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create()
    {
        return inertia('CategoryForm', [
            'category' => null,
            'locales' => ['en', 'fr', 'ar'], // Add locales for translation
        ]);
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'slug' => 'required|unique:categories,slug',
            'translations' => 'required|array',
            'translations.*.name' => 'required|string|max:255',
        ]);

        // Create the category with a generated or provided slug
        $category = Category::create([
            'slug' => $validatedData['slug'],
        ]);

        // Handle translations (locales)
        foreach ($validatedData['translations'] as $locale => $translation) {
            $category->translations()->create([
                'locale' => $locale,
                'name' => $translation['name'],
            ]);
        }

        return redirect()->route('categories.index')->with('success', 'Category created successfully!');
    }

    /**
     * Check if the slug is unique.
     */
    public function checkSlug(Request $request)
    {
        $slug = $request->query('slug');
        $exists = Category::where('slug', $slug)->exists();

        return response()->json(['exists' => $exists]);
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(Category $category)
    {
        return inertia('CategoryForm', [
            'category' => $category->load('translations'),
            'locales' => ['en', 'fr', 'ar'], // Add locales for translation
        ]);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate incoming request data
        $category = Category::findOrFail($id);
        $validatedData = $request->validate([
            'slug' => [
                'required',
                Rule::unique('categories')->ignore($category->id), // Ignore the current category when checking uniqueness
            ],
            'translations' => 'required|array',
            'translations.*.name' => 'required|string|max:255',
        ]);

        // Update the category
        $category->update([
            'slug' => $validatedData['slug'],
        ]);

        // Handle translations (locales)
        foreach ($validatedData['translations'] as $locale => $translation) {
            $category->translations()->updateOrCreate(
                ['locale' => $locale],
                ['name' => $translation['name']]
            );
        }

        return redirect()->route('categories.index')->with('success', 'Category updated successfully!');
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(Category $category)
    {
        // Prevent deletion if blogs are associated
        if ($category->blogs()->exists()) {
            return redirect()->route('categories.index')
                ->with('error', 'Category cannot be deleted because it has associated blogs.');
        }

        $category->delete();

        return redirect()->route('categories.index')
            ->with('success', 'Category deleted successfully!');
    }
}
