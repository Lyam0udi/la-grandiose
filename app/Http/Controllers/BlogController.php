<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogTranslation;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of blogs.
     */
    public function index()
    {
        $blogs = Blog::with(['translations', 'category.translations'])->paginate(10); // Paginate for better dashboard performance
        return inertia('BlogManagement', compact('blogs'));
    }

    /**
     * Show the form for creating a new blog.
     */
    public function create()
    {
        $categories = Category::with('translations')->get();
        return inertia('BlogForm', compact('categories'));
    }

    /**
     * Store a newly created blog in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|image|max:2048',
            'translations' => 'required|array',
            'translations.*.locale' => 'required|in:ar,en,fr',
            'translations.*.title' => 'required|string|max:255',
            'translations.*.content' => 'required|string',
        ]);

        // Store image
        $imagePath = $request->file('image')->store('blogs', 'public');

        // Create the blog
        $blog = Blog::create([
            'category_id' => $validated['category_id'],
            'image' => $imagePath,
            'post_date' => now(),
        ]);

        // Create translations
        foreach ($validated['translations'] as $translation) {
            $blog->translations()->create($translation);
        }

        return redirect()->route('blogs.index')->with('success', 'Blog created successfully.');
    }

    /**
     * Show the form for editing the specified blog.
     */
    public function edit(Blog $blog)
    {
        $categories = Category::with('translations')->get();
        $blog->load('translations', 'category.translations');
        return inertia('BlogForm', compact('blog', 'categories'));
    }

    /**
     * Update the specified blog in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'translations' => 'required|array',
            'translations.*.locale' => 'required|in:ar,en,fr',
            'translations.*.title' => 'required|string|max:255',
            'translations.*.content' => 'required|string',
        ]);

        // Update image if provided
        if ($request->hasFile('image')) {
            // Delete old image
            if ($blog->image) {
                Storage::disk('public')->delete($blog->image);
            }
            $imagePath = $request->file('image')->store('blogs', 'public');
            $blog->image = $imagePath;
        }

        $blog->update([
            'category_id' => $validated['category_id'],
        ]);

        // Update translations
        foreach ($validated['translations'] as $translation) {
            $blog->translations()->updateOrCreate(
                ['locale' => $translation['locale']],
                $translation
            );
        }

        return redirect()->route('blogs.index')->with('success', 'Blog updated successfully.');
    }

    /**
     * Remove the specified blog from storage.
     */
    public function destroy(Blog $blog)
    {
        // Delete image
        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }

        $blog->delete();
        return redirect()->route('blogs.index')->with('success', 'Blog deleted successfully.');
    }
}
