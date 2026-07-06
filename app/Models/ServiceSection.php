<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceSection extends Model
{
    protected $fillable = [
        'badge',
        'title',
        'titleHighlight',
        'desc',
        'from_color',
        'via_color',
        'to_color',
        'deg',
    ];
}
