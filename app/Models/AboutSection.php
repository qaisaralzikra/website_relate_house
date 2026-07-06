<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model
{
    protected $fillable = [
        'title',
        'titleHighlight',
        'desc_1',
        'desc_2',
        'image',
    ];
}
