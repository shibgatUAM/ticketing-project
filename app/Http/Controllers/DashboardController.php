<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        // $stats = auth()->user()->isAdmin() ? [
        //     'totalEvents'  => Event::count(),
        //     'totalUsers'   => User::where('role', 'user')->count(),
        //     'totalTickets' => Ticket::count(),
        // ] : null;
        // return Inertia::render('dashboard', $stats);

        $user = auth()->user();

        return Inertia::render('dashboard', [
            'stats' => $user->isAdmin() ? [
                'totalEvents'  => Event::count(),
                'totalUsers'   => User::where('role', 'user')->count(),
                'totalTickets' => Ticket::count(),
            ] : null,
        ]);
    }
}
