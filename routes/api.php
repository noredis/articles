<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(ArticleController::class)->group(function () {
    Route::post('/articles', 'store');
    Route::get('/articles/{id}', 'index')->whereNumber('id');
    Route::get('/articles', 'show');
});

Route::controller(CommentController::class)->group(function () {
    Route::post('/articles/{id}/comments', 'store');
    Route::get('/articles/{id}/comments', 'show');
})->whereNumber('id');
