<?php

namespace App\Http\Controllers;

use App\Actions\StoreArticle;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Resources\ArticleCollection;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
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

    public function index(int $id): JsonResource
    {
        $article = Article::where('id', $id)->firstOrFail();
        return new ArticleResource($article);
    }

    public function show(Request $request): JsonResource
    {
        $articles = Article::query()
            ->paginate($request->integer('per_page', 5));
        return new ArticleCollection($articles);
    }
}
