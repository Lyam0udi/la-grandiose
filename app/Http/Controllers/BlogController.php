<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('category.translations', 'translations')->get();
        return inertia('BlogManagement', ['blogs' => $blogs]);
    }

    public function create()
    {
        $categories = Category::with('translations')->get();
        return inertia('CategoryForm/Create', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'translations.*.locale' => 'required|in:en,fr,ar',
            'translations.*.title' => 'required|string|max:255',
            'translations.*.content' => 'required|string',
        ]);

        $path = $request->file('image')?->store('blogs');

        $blog = Blog::create([
            'category_id' => $request->category_id,
            'image' => $path,
        ]);

        foreach ($request->translations as $translation) {
            $blog->translations()->create([
                'locale' => $translation['locale'],
                'title' => $translation['title'],
                'content' => $translation['content'],
            ]);
        }

        return redirect()->route('blogs.index')->with('success', 'Blog created successfully!');
    }

    public function edit(Blog $blog)
    {
        $categories = Category::with('translations')->get();
        $blog->load('translations');
        return inertia('Blogs/Edit', ['blog' => $blog, 'categories' => $categories]);
    }

    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'translations.*.locale' => 'required|in:en,fr,ar',
            'translations.*.title' => 'required|string|max:255',
            'translations.*.content' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blogs');
            $blog->update(['image' => $path]);
        }

        $blog->update(['category_id' => $request->category_id]);

        foreach ($request->translations as $translation) {
            $blogTranslation = $blog->translations()->where('locale', $translation['locale'])->first();
            if ($blogTranslation) {
                $blogTranslation->update([
                    'title' => $translation['title'],
                    'content' => $translation['content'],
                ]);
            } else {
                $blog->translations()->create($translation);
            }
        }

        return redirect()->route('blogs.index')->with('success', 'Blog updated successfully!');
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();
        return redirect()->route('blogs.index')->with('success', 'Blog deleted successfully!');
    }
}
