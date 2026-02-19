<?php

namespace App\Http\Controllers;

use App\Actions\StoreComment;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Resources\CommentResource;
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
}
