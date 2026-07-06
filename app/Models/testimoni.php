<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class testimoni extends Model
{
    protected $fillable = [
        'project_id',
        'nama',
        'image',
        'event',
        'review',
        'jabatan',
        'rating',
        'from_color',
        'to_color',
        'deg_color',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(project::class, 'project_id', 'id');
    }
}
