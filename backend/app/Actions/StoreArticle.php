<?php

namespace App\Actions;

use App\Models\Article;

class StoreArticle
{
    public function __invoke(array $data): Article 
    {
        return Article::create([...$data]);
    }
}
