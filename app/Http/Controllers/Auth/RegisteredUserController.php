<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response|RedirectResponse
    {
        // Check if there are already 4 admin users
        $adminRole = Role::where('name', 'admin')->first();

        // If no admin role is found, return an error
        if (!$adminRole) {
            return redirect()->route('login')->with('flash', 'Admin role not found.');
        }

        // Count how many users already have the admin role
        $userCount = User::where('role_id', $adminRole->id)->count();

        // If 4 or more admin users exist, registration is closed
        if ($userCount >= 4) {
            // Redirect to login with a flash message
            return redirect()->route('login')->with('flash', 'Registration is closed. Only 4 admins are allowed.');
        }

        // Render the registration form if there are fewer than 4 admins
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validation for registration fields
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Get the admin role
        $adminRole = Role::where('name', 'admin')->first();
        if (!$adminRole) {
            return redirect()->route('register')->with('flash', 'Admin role not found.');
        }

        // Count how many users already have the admin role
        $userCount = User::where('role_id', $adminRole->id)->count();

        // Assign the admin role to the first 4 users, others will be assigned a different role
        if ($userCount < 4) {
            $roleId = $adminRole->id; // Assign admin role to first 4 users
        } else {
            // Registration is closed after 4 admins
            return redirect()->route('login')->with('flash', 'Registration is closed. Only 4 admins are allowed.');
        }

        // Create the new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $roleId,
        ]);

        // Event for user registration
        event(new Registered($user));

        // Log the user in
        Auth::login($user);

        // Redirect to the dashboard
        return redirect()->route('dashboard'); // Replace with your intended dashboard route
    }
}
