<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class project extends Model
{
    protected $fillable = [
        'id_kategori',
        'title',
        'desc',
        'image',
        'sub_kategori',
        'guest_count',
        'location',
        'preparation_time',
        'challenge',
        'solution',
        'results',
        'video',
        'is_featured',
    ];

    public function categori(): BelongsTo
    {
        return $this->belongsTo(categori::class, 'id_kategori', 'id');
    }

    public function testimonials(): HasMany
    {
        return $this->hasMany(testimoni::class, 'project_id', 'id');
    }

    public function galleries(): HasMany
    {
        return $this->hasMany(Galery::class, 'project_id', 'id');
    }
}
