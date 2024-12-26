<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryTranslation;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('translations')->get();
        return inertia('Categories/Index', ['categories' => $categories]);
    }

    public function create()
    {
        return inertia('Categories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'translations.*.locale' => 'required|in:en,fr,ar',
            'translations.*.name' => 'required|string|max:255',
        ]);

        $category = Category::create();

        foreach ($request->translations as $translation) {
            $category->translations()->create([
                'locale' => $translation['locale'],
                'name' => $translation['name'],
                'slug' => str()->slug($translation['name']),
            ]);
        }

        return redirect()->route('categories.index')->with('success', 'Category created successfully!');
    }

    public function edit(Category $category)
    {
        $category->load('translations');
        return inertia('Categories/Edit', ['category' => $category]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'translations.*.locale' => 'required|in:en,fr,ar',
            'translations.*.name' => 'required|string|max:255',
        ]);

        foreach ($request->translations as $translation) {
            $categoryTranslation = $category->translations()->where('locale', $translation['locale'])->first();
            if ($categoryTranslation) {
                $categoryTranslation->update([
                    'name' => $translation['name'],
                    'slug' => str()->slug($translation['name']),
                ]);
            } else {
                $category->translations()->create([
                    'locale' => $translation['locale'],
                    'name' => $translation['name'],
                    'slug' => str()->slug($translation['name']),
                ]);
            }
        }

        return redirect()->route('categories.index')->with('success', 'Category updated successfully!');
    }

    public function destroy(Category $category)
    {
        if ($category->blogs()->exists()) {
            return redirect()->route('categories.index')->with('error', 'Category cannot be deleted as it is assigned to blogs.');
        }

        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully!');
    }
}

