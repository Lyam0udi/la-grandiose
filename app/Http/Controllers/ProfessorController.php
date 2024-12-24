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
        $validated = $request->validate([
            'photo' => 'nullable|image|max:2048',
            'translations.*.locale' => 'required|string',
            'translations.*.name' => 'required|string|max:255',
            'translations.*.study_material' => 'required|string|max:255',
            'translations.*.description' => 'required|string',
        ]);

        $professor = new Professor();

        if ($request->hasFile('photo')) {
            $professor->photo = $request->file('photo')->store('professors', 'public');
        }

        $professor->save();

        foreach ($validated['translations'] as $translation) {
            $professor->translations()->create($translation);
        }

        return redirect()->route('professor.index');
    }

    // Show the form for editing a professor
    public function edit(Professor $professor)
    {
        $locales = ['en', 'fr', 'es']; // Supported languages
        $translations = $professor->translations->keyBy('locale'); // Organize by locale
        return Inertia::render('ProfessorForm', ['professor' => $professor, 'locales' => $locales, 'translations' => $translations]);
    }

    // Update an existing professor
    public function update(Request $request, Professor $professor)
    {
        $validated = $request->validate([
            'photo' => 'nullable|image|max:2048',
            'translations.*.locale' => 'required|string',
            'translations.*.name' => 'required|string|max:255',
            'translations.*.study_material' => 'required|string|max:255',
            'translations.*.description' => 'required|string',
        ]);

        if ($request->hasFile('photo')) {
            $professor->photo = $request->file('photo')->store('professors', 'public');
        }

        $professor->save();

        foreach ($validated['translations'] as $translation) {
            $professor->translations()->updateOrCreate(
                ['locale' => $translation['locale']],
                $translation
            );
        }

        return redirect()->route('professor.index');
    }

    // Delete a professor
    public function destroy(Professor $professor)
    {
        $professor->delete();
        return redirect()->route('professor.index');
    }
}

