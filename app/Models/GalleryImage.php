<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryImage extends Model
{
    protected $fillable = [
        'galery_id',
        'image',
        'sort_order',
    ];

    public function galery(): BelongsTo
    {
        return $this->belongsTo(Galery::class);
    }
}
