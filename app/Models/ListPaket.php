<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ListPaket extends Model
{
    protected $fillable = [
        'id_price_service',
        'item_name',
        'nominal',
        'sort_order',
    ];

    public function priceService(): BelongsTo
    {
        return $this->belongsTo(PriceService::class, 'id_price_service');
    }
}
