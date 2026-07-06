<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class footer extends Model
{
    protected $fillable = [
        'brandName',
        'brandHighlight',
        'description',
        'email',
        'whatsapp',
        'whatsappUrl',
        'address',
        'copyright',
        'tagline',
    ];
}
