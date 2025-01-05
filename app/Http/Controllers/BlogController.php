<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str; // Import this!
use Inertia\Inertia;


class BlogController extends Controller
{
    /**
     * Display a listing of blogs.
     */
    public function index()
    {
        $blogs = Blog::with(['translations', 'category.translations'])->paginate(10);
        return inertia('BlogManagement', compact('blogs'));
    }

    public function blogIndex() { // Frontend view
        $blogs = Blog::with(['translations', 'category.translations'])->paginate(10);
        return inertia('Blog', ['blogs' => $blogs]);
    }

    public function blogData()
    {
        $blogs = Blog::with(['translations', 'category.translations'])->paginate(10);
        return response()->json(['blogs' => $blogs]);
    }

    /// single blog page
    public function blogDetails($slug)
    {
        // Fetch the current blog using the slug
        $blog = Blog::where('slug', $slug)
                    ->with('translations', 'category.translations')
                    ->firstOrFail();

        // Fetch other blogs for the carousel
        $allBlogs = Blog::with('translations', 'category.translations')
                        ->where('slug', '!=', $slug) // Exclude the current blog
                        ->get();

        // Pass both the blog and allBlogs data to the view
        return Inertia::render('BlogDetails', [
            'slug' => $slug, // Pass slug to the React component
            'blog' => $blog, // Pass the blog data
            'allBlogs' => $allBlogs, // Pass all blogs for the carousel
        ]);
    }

    /// single blog page
    public function blogDetailsData($slug) {
        // Fetch the blog by slug with translations and category
        $blog = Blog::with(['translations', 'category.translations'])
                    ->where('slug', $slug)
                    ->firstOrFail();  // Fail if not found
        
        // Return the blog data in JSON format
        return response()->json(['blog' => $blog]);
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
        // Validate the incoming data
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'slug' => 'nullable|string|max:255',
            'image' => 'required|image|max:2048',
            'translations' => 'required|array',
            'translations.ar.title' => 'required|string|max:255',
            'translations.ar.content' => 'required|string',
            'translations.en.title' => 'required|string|max:255',
            'translations.en.content' => 'required|string',
            'translations.fr.title' => 'required|string|max:255',
            'translations.fr.content' => 'required|string',
        ]);

        try {
            // Start a database transaction
            \DB::beginTransaction();

            // Handle image upload
            $imagePath = $request->file('image')->store('blogs', 'public');

            // Create the blog with a temporary slug
            $blog = Blog::create([
                'category_id' => $validated['category_id'],
                'slug' => $validated['slug'] ?? 'tmp-blog-' . time() . '-tmp',
                'image' => $imagePath,
            ]);

            // Replace "-tmp" in the slug with "-blogid"
            $blog->slug = Str::replaceLast('-tmp', '-' . $blog->id, $blog->slug);
            $blog->saveQuietly();

            // Save translations
            foreach ($validated['translations'] as $locale => $translation) {
                $blog->translations()->create([
                    'locale' => $locale,
                    'title' => $translation['title'],
                    'content' => $translation['content'],
                ]);
            }

            // Commit transaction
            \DB::commit();

            return redirect()->route('blogs.index')->with('success', 'Blog created successfully.');
        } catch (\Exception $e) {
            // Rollback transaction on failure
            \DB::rollBack();

            // Log error for debugging
            \Log::error('Blog creation failed: ' . $e->getMessage());

            return redirect()->back()->withErrors('An error occurred while creating the blog.');
        }
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

        // Update the image if provided
        if ($request->hasFile('image')) {
            if ($blog->image) {
                Storage::disk('public')->delete($blog->image);
            }
            $imagePath = $request->file('image')->store('blogs', 'public');
            $blog->image = $imagePath;
        }

        // Update the blog
        $blog->update(['category_id' => $validated['category_id']]);

        // Update or create translations
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
        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }
        $blog->translations()->delete();
        $blog->delete();

        return redirect()->route('blogs.index')->with('success', 'Blog deleted successfully.');
    }
}
