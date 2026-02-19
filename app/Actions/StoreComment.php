<?php

namespace App\Actions;

use App\Models\Comment;

class StoreComment
{
    public function __invoke(array $data): Comment
    {
        return Comment::create([...$data]);
    }
}
