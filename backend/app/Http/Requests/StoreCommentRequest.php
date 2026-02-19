<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'article_id'  => ['required', 'integer', 'exists:App\Models\Article,id'],
            'author_name' => ['required', 'string', 'max:127'],
            'content'     => ['required', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'article_id.required'  => 'article_id is required',
            'article_id.integer'   => 'article_id must be an integer',
            'article_id.exists'    => 'article with this id was not found',
            'author_name.required' => 'author_name is required',
            'author_name.string'   => 'author_name must be a string',
            'author_name.max'      => 'author_name must not exceed 127 characters',
            'content.required'     => 'content is required',
            'content.string'       => 'content must be a string',
            'content.max'          => 'content must not exceed 1000 characters',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'article_id' => $this->route('id'),
        ]);
    }
}
