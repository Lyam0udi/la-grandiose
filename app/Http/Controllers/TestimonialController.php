<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use App\Models\TestimonialTranslation;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::with('translations')->get();
        return inertia('TestimonialManagement', ['testimonials' => $testimonials]);
    }

    public function create()
    {
        $locales = config('app.supported_locales');
        return inertia('TestimonialForm', ['locales' => $locales]);
    }

    public function store(Request $request)
    {
        // Validate the data being sent from the front-end
        $request->validate([
            'emoticon' => 'nullable|string|max:255',
            'is_student' => 'required|in:Student,Parent', // Changed to match the front-end
            'translations.*.name' => 'required|string|max:255',
            'translations.*.description' => 'required|string',
        ]);

        // Create the testimonial entry in the database
        $testimonial = Testimonial::create([
            'emoticon' => $request->emoticon,
            'is_student' => $request->is_student === 'Student', // Storing as boolean
        ]);

        // Create translations for each locale
        foreach ($request->translations as $locale => $data) {
            $testimonial->translations()->create([
                'locale' => $locale,
                'name' => $data['name'],
                'description' => $data['description'],
            ]);
        }

        return redirect()->route('testimonials.index')->with('success', 'Testimonial created successfully.');
    }

    public function edit(Testimonial $testimonial)
    {
        $locales = config('app.supported_locales');
        $testimonial->load('translations'); // Load the translations for the testimonial
        return inertia('TestimonialForm', ['testimonial' => $testimonial, 'locales' => $locales]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        // Validate the data being sent from the front-end
        $request->validate([
            'emoticon' => 'nullable|string|max:255',
            'is_student' => 'required|in:Student,Parent', // Changed to match the front-end
            'translations.*.name' => 'required|string|max:255',
            'translations.*.description' => 'required|string',
        ]);

        // Update the testimonial entry in the database
        $testimonial->update([
            'emoticon' => $request->emoticon,
            'is_student' => $request->is_student === 'Student', // Storing as boolean
        ]);

        // Update or create translations for each locale
        foreach ($request->translations as $locale => $data) {
            $testimonial->translations()->updateOrCreate(
                ['locale' => $locale], // Check if translation exists for the locale
                [
                    'name' => $data['name'],
                    'description' => $data['description'],
                ]
            );
        }

        return redirect()->route('testimonials.index')->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        // Delete the testimonial and its translations
        $testimonial->delete();
        return redirect()->route('testimonials.index')->with('success', 'Testimonial deleted successfully.');
    }

    // Method purpose : display data in the landing page
    public function getTestimonialsForLandingPage()
    {
        $testimonials = Testimonial::with('translations')->get();

        // Map all testimonials with their translations
        $formattedTestimonials = $testimonials->map(function ($testimonial) {
            return [
                'id' => $testimonial->id,
                'emoticon' => $testimonial->emoticon,
                'is_student' => $testimonial->is_student ? 'Student' : 'Parent',
                'translations' => $testimonial->translations->mapWithKeys(function ($translation) {
                    return [
                        $translation->locale => [
                            'name' => $translation->name,
                            'description' => $translation->description,
                        ],
                    ];
                }),
            ];
        });

        return response()->json($formattedTestimonials);
    }


}
