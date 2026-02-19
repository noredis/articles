<?php

namespace App\Http\Controllers;

use App\Actions\StoreComment;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Resources\CommentCollection;
use App\Http\Resources\CommentResource;
use App\Models\Article;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentController extends Controller
{
    public function store(
        StoreCommentRequest $request,
        StoreComment $storeComment,
    ): JsonResource
    {
        $comment = $storeComment($request->validated());
        return new CommentResource($comment);
    }

    public function show(int $id): JsonResource
    {
        $comments = Article::where('id', $id)->firstOrFail()->comments;
        return new CommentCollection($comments);
    }
}
