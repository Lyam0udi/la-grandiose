<?php

namespace App\Http\Controllers;

use App\Models\Cycle;
use App\Models\CycleTranslation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CycleController extends Controller
{
    // List all cycles
    public function index()
    {
        $cycles = Cycle::with('translations')->get();
        return Inertia::render('CycleManagement', ['cycles' => $cycles]);
    }

    // Show the form for creating a new cycle
    public function create()
    {
        $locales = ['en', 'fr', 'ar']; // Supported languages
        return Inertia::render('CycleForm', ['locales' => $locales]);
    }

    // Store a newly created cycle
    public function store(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|max:2048',
            'translations.*.name' => 'required|string|max:255',
            'translations.*.description' => 'nullable|string',
            'translations.*.more_details' => 'nullable|string',
            'duration' => 'required|string|max:255',
            'age_range' => 'required|string|max:255',
        ]);

        // Save the cycle
        $cycle = new Cycle();
        if ($request->hasFile('photo')) {
            $cycle->photo = $request->file('photo')->store('cycles_photos', 'public');
        }
        $cycle->duration = $request->input('duration');
        $cycle->age_range = $request->input('age_range');
        $cycle->save();

        // Save translations
        foreach ($request->input('translations') as $locale => $translation) {
            $cycle->translations()->create([
                'locale' => $locale,
                'name' => $translation['name'],
                'description' => $translation['description'],
                'more_details' => $translation['more_details'],
            ]);
        }

        return redirect()->route('cycle.index')->with('success', 'Cycle added successfully!');
    }

    // Show the form for editing a cycle
    public function edit(Cycle $cycle)
    {
        $locales = ['en', 'fr', 'ar']; // Supported languages
        $translations = $cycle->translations->keyBy('locale'); // Organize by locale
        return Inertia::render('CycleForm', [
            'cycle' => $cycle,
            'locales' => $locales,
            'translations' => $translations
        ]);
    }

    // Update an existing cycle
    public function update(Request $request, Cycle $cycle)
    {
        $request->validate([
            'photo' => 'nullable|image|max:2048',
            'translations.*.name' => 'required|string|max:255',
            'translations.*.description' => 'nullable|string',
            'translations.*.more_details' => 'nullable|string',
            'duration' => 'required|string|max:255',
            'age_range' => 'required|string|max:255',
        ]);

        // Update the cycle
        if ($request->hasFile('photo')) {
            // Optionally delete the old photo
            if ($cycle->photo) {
                \Storage::disk('public')->delete($cycle->photo);
            }
            $cycle->photo = $request->file('photo')->store('cycles_photos', 'public');
        }
        $cycle->duration = $request->input('duration');
        $cycle->age_range = $request->input('age_range');
        $cycle->save();

        // Update translations
        foreach ($request->input('translations') as $locale => $translation) {
            $cycle->translations()->updateOrCreate(
                ['locale' => $locale],
                [
                    'name' => $translation['name'],
                    'description' => $translation['description'],
                    'more_details' => $translation['more_details'],
                ]
            );
        }

        return redirect()->route('cycle.index')->with('success', 'Cycle updated successfully!');
    }

    // Delete a cycle
    public function destroy(Cycle $cycle)
    {
        // Optionally delete the photo before removing the cycle
        if ($cycle->photo) {
            \Storage::disk('public')->delete($cycle->photo);
        }
        $cycle->delete();
        return redirect()->route('cycle.index');
    }
}
