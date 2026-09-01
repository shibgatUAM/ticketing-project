<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(
        function () {
            // User management
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::patch('/users/{user}/role', [UserController::class, 'updateRole'])->name('users.update-role');
            Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        }
    );
});

require __DIR__ . '/settings.php';
