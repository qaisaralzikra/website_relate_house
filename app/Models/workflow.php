<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class workflow extends Model
{
    protected $fillable = [
        'step',
        'title',
        'desc',
        'icon',
    ];

    protected function casts(): array
    {
        return [
            'step' => 'integer',
        ];
    }
}
