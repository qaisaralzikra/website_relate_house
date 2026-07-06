<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CtaSection extends Model
{
    protected $fillable = [
        'media',
        'label',
        'url',
        'is_active',
        'from_color',
        'via_color',
        'to_color',
        'deg_color',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
