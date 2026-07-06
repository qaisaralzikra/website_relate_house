<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PriceService extends Model
{
    protected $fillable = [
        'id_banom',
        'id_image_service',
        'paket_name',
        'paket_desc',
        'populer',
    ];

    protected function casts(): array
    {
        return [
            'populer' => 'boolean',
        ];
    }

    public function banom(): BelongsTo
    {
        return $this->belongsTo(Banom::class, 'id_banom');
    }

    public function listPakets(): HasMany
    {
        return $this->hasMany(ListPaket::class, 'id_price_service');
    }

    public function imageService(): BelongsTo
    {
        return $this->belongsTo(ImageService::class, 'id_image_service');
    }
}
