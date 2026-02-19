<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    const UPDATED_AT = null;

    protected $table = 'comments';
    protected $primaryKey = 'id';

    protected $fillable = [
        'article_id',
        'author_name',
        'content',
    ];
}
