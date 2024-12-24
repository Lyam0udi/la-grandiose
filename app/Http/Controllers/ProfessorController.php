<?php

namespace App\Http\Controllers;

use App\Models\Professor;
use App\Models\ProfessorTranslation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfessorController extends Controller
{
    // List all professors
    public function index()
    {
        $professors = Professor::with('translations')->get();
        return Inertia::render('ProfessorManagement', ['professors' => $professors]);
    }

    // Show the form for creating a new professor
    public function create()
    {
        $locales = ['en', 'fr', 'ar']; // Supported languages
        return Inertia::render('ProfessorForm', ['locales' => $locales]);
    }

    // Store a newly created professor
    public function store(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|max:2048',
            'translations.*.name' => 'required|string|max:255',
            'translations.*.study_material' => 'required|string|max:255',
            'translations.*.description' => 'nullable|string',
        ]);

        // Save the professor
        $professor = new Professor();
        if ($request->hasFile('photo')) {
            $professor->photo = $request->file('photo')->store('professors_photos', 'public');
        }
        $professor->save();

        // Save translations
        foreach ($request->input('translations') as $locale => $translation) {
            $professor->translations()->create([
                'locale' => $locale,
                'name' => $translation['name'],
                'study_material' => $translation['study_material'],
                'description' => $translation['description'],
            ]);
        }

        return redirect()->route('professor.index')->with('success', 'Professor added successfully!');
    }

    // Show the form for editing a professor
    public function edit(Professor $professor)
    {
        $locales = ['en', 'fr', 'ar']; // Supported languages
        $translations = $professor->translations->keyBy('locale'); // Organize by locale
        return Inertia::render('ProfessorForm', ['professor' => $professor, 'locales' => $locales, 'translations' => $translations]);
    }

    // Update an existing professor
    public function update(Request $request, Professor $professor)
    {
        $request->validate([
            'photo' => 'nullable|image|max:2048',
            'translations.*.name' => 'required|string|max:255',
            'translations.*.study_material' => 'required|string|max:255',
            'translations.*.description' => 'nullable|string',
        ]);

        // Update the professor
        if ($request->hasFile('photo')) {
            // Optionally delete the old photo
            if ($professor->photo) {
                \Storage::disk('public')->delete($professor->photo);
            }
            $professor->photo = $request->file('photo')->store('professors_photos', 'public');
        }
        $professor->save();

        // Update translations
        foreach ($request->input('translations') as $locale => $translation) {
            $professor->translations()->updateOrCreate(
                ['locale' => $locale],
                [
                    'name' => $translation['name'],
                    'study_material' => $translation['study_material'],
                    'description' => $translation['description'],
                ]
            );
        }

        return redirect()->route('professor.index')->with('success', 'Professor updated successfully!');
    }

    // Delete a professor
    public function destroy(Professor $professor)
    {
        // Optionally delete the photo before removing the professor
        if ($professor->photo) {
            \Storage::disk('public')->delete($professor->photo);
        }
        $professor->delete();
        return redirect()->route('professor.index');
    }
}
