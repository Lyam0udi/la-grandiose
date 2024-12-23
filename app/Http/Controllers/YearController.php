<?php

// app/Http/Controllers/YearController.php

namespace App\Http\Controllers;

use App\Models\Year;
use Inertia\Inertia;
use Illuminate\Http\Request;

class YearController extends Controller
{
    // Show the current year page
    public function show()
    {
        $currentYear = Year::first(); // Get the current year from the database
        return Inertia::render('YearPage', [
            'currentYear' => $currentYear
        ]);
    }

    // Update the year in the database
    public function update(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'startYear' => 'required|integer|min:1900|max:2100',  // Valid year range
            'endYear' => 'required|integer|min:1900|max:2100',
        ]);

        // Update or create the year entry
        $year = Year::first(); // Fetch the first (or only) year entry

        if (!$year) {
            // If no year entry exists, create one
            $year = new Year();
        }

        $year->startYear = $validated['startYear'];  // Set the start year
        $year->endYear = $validated['endYear'];      // Set the end year
        $year->save();  // Save the year data to the database

        return redirect()->route('year.show');  // Redirect to the show page after updating
    }
}
