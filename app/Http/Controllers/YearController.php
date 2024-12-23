<?php

// app/Http/Controllers/YearController.php

namespace App\Http\Controllers;

use App\Models\Year;
use Inertia\Inertia;
use Illuminate\Http\Request;

class YearController extends Controller
{
    // Show the current year
    public function index()
    {
        $year = Year::first();  // Get the current year (only one record in the table)
        return Inertia::render('Year', [
            'year' => $year
        ]);
    }

    // Update the current year
    public function update(Request $request)
    {
        $request->validate([
            'year' => 'required|integer|digits:4',  // Ensure it's a valid 4-digit year
        ]);

        $year = Year::first();  // Assuming there is only one year record

        if (!$year) {
            $year = Year::create(['year' => $request->year]);  // If no year is set, create a new one
        } else {
            $year->update(['year' => $request->year]);  // Update the existing year
        }

        return redirect()->route('year.index')->with('success', 'Year updated successfully!');
    }
}

