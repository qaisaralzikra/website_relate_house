<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ImageService extends Model
{
    protected $fillable = [
        'name',
        'image',
        'id_banom',
    ];

    public function banom(): BelongsTo
    {
        return $this->belongsTo(Banom::class, 'id_banom');
    }

    public function priceServices(): HasMany
    {
        return $this->hasMany(PriceService::class, 'id_image_service');
    }
}
