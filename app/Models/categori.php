<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class categori extends Model
{
    protected $fillable = [
        'nama_kategori',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(project::class, 'id_kategori', 'id');
    }
}
