<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Article extends Model
{
    const UPDATED_AT = null;

    protected $table = 'articles';
    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'content',
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
