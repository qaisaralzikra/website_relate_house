<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Galery extends Model
{
    protected $fillable = [
        'project_id',
        'label',
        'tampil',
    ];

    protected function casts(): array
    {
        return [
            'tampil' => 'boolean',
        ];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(project::class, 'project_id', 'id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(GalleryImage::class);
    }
}
