<?php

namespace App\Http\Controllers;

use App\Actions\StoreArticle;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Resources\ArticleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleController extends Controller
{
    public function store(
        StoreArticleRequest $request,
        StoreArticle $storeArticle,
    ): JsonResource
    {
        $article = $storeArticle($request->validated());
        return new ArticleResource($article);
    }

    public function index()
    {
    }
}
