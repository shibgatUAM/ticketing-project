<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Override;

class Ticket extends Model
{
    protected $fillable = [
        'user_id',
        'event_id',
        'barcode',
        'is_verified',
        'verified_at'
    ];

    protected $casts = [
        'is_verified' => 'boolean',
        'verified_at' => 'dateTime'
    ];

    #[Override]
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($ticket) {
            if (empty($ticket->barcode)) {
                $ticket->barcode = static::generateUniqueBarcode();
            }
        });
    }

    protected static function generateUniqueBarcode()
    {
        do {
            $barcode = 'TKT-' . strtoupper(Str::random(12));
        } while (static::where('barcode', $barcode)->exists());
        return $barcode;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function verify()
    {
        $this->update([
            'is_verified' => true,
            'verified_at' => now()
        ]);
    }
}
