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
        $request->validate([
            'emoticon' => 'nullable|string|max:255',
            'is_parent' => 'required|boolean',
            'translations.*.name' => 'required|string|max:255',
            'translations.*.description' => 'required|string',
        ]);

        $testimonial = Testimonial::create($request->only(['emoticon', 'is_parent']));

        foreach ($request->translations as $locale => $data) {
            $testimonial->translations()->create(array_merge($data, ['locale' => $locale]));
        }

        return redirect()->route('testimonials.index')->with('success', 'Testimonial created successfully.');
    }

    public function edit(Testimonial $testimonial)
    {
        $locales = config('app.supported_locales');
        $testimonial->load('translations');
        return inertia('TestimonialForm', ['testimonial' => $testimonial, 'locales' => $locales]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $request->validate([
            'emoticon' => 'nullable|string|max:255',
            'is_parent' => 'required|boolean',
            'translations.*.name' => 'required|string|max:255',
            'translations.*.description' => 'required|string',
        ]);

        $testimonial->update($request->only(['emoticon', 'is_parent']));

        foreach ($request->translations as $locale => $data) {
            $translation = $testimonial->translations()->updateOrCreate(
                ['locale' => $locale],
                $data
            );
        }

        return redirect()->route('testimonials.index')->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return redirect()->route('testimonials.index')->with('success', 'Testimonial deleted successfully.');
    }
}

