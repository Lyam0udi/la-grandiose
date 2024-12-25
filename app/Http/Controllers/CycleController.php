<?php

namespace App\Http\Controllers;

use App\Models\Cycle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CycleController extends Controller
{
    public function index()
    {
        $cycles = Cycle::all();
        return Inertia::render('Cycles/Index', [
            'cycles' => $cycles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Cycles/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|array',
            'description' => 'required|array',
            'photo' => 'nullable|string',
            'more_details' => 'nullable|array',
            'level_range' => 'required|string',
            'duration' => 'required|integer',
            'age_range' => 'required|string',
        ]);

        Cycle::create($validated);

        return redirect()->route('cycles.index')->with('success', 'Cycle created successfully!');
    }

    public function edit(Cycle $cycle)
    {
        return Inertia::render('Cycles/Edit', [
            'cycle' => $cycle,
        ]);
    }

    public function update(Request $request, Cycle $cycle)
    {
        $validated = $request->validate([
            'name' => 'required|array',
            'description' => 'required|array',
            'photo' => 'nullable|string',
            'more_details' => 'nullable|array',
            'level_range' => 'required|string',
            'duration' => 'required|integer',
            'age_range' => 'required|string',
        ]);

        $cycle->update($validated);

        return redirect()->route('cycles.index')->with('success', 'Cycle updated successfully!');
    }

    public function destroy(Cycle $cycle)
    {
        $cycle->delete();

        return redirect()->route('cycles.index')->with('success', 'Cycle deleted successfully!');
    }
}

