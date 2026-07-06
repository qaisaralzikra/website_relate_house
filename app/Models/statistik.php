<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class statistik extends Model
{
    protected $fillable = [
        'value',
        'label',
        'suffix'
    ];

    protected function casts(): array
    {
        return [
            'value' => 'integer',
        ];
    }
}
