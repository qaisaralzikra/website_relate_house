<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    protected $fillable = [
        'badge',
        'title',
        'titleHighlight',
        'subtitle',
        'from_color',
        'via_color',
        'to_color',
        'deg_color',
        'showScrollIndicator',
    ];

    protected function casts(): array
    {
        return [
            'showScrollIndicator' => 'boolean',
        ];
    }
}
