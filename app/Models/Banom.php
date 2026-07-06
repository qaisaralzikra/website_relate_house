<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Banom extends Model
{
    protected $fillable = [
        'icon',
        'title',
        'desc',
    ];

    public function priceServices(): HasMany
    {
        return $this->hasMany(PriceService::class, 'id_banom');
    }

    public function imageServices(): HasMany
    {
        return $this->hasMany(ImageService::class, 'id_banom');
    }
}
