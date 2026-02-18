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
            'author_name' => ['required', 'string', 'max:127'],
            'content'     => ['required', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'author_name.required' => 'author_name is required',
            'author_name.string'   => 'author_name must be a string',
            'author_name.max'      => 'author_name must not exceed 127 characters',
            'content.required'     => 'content is required',
            'content.string'       => 'content must be a string',
            'content.max'          => 'content must not exceed 1000 characters',
        ];
    }
}
