<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Log session data to check if it's being stored correctly
        \Log::debug('Session Data:', session()->all());

        // Sharing flash data with all Inertia responses
        Inertia::share([
            'flash' => fn () => session()->get('message'), // Retrieve only the 'message' key
        ]);

        Vite::prefetch(concurrency: 3);
    }
}
