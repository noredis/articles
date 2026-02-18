<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
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
            'title'   => ['required', 'string', 'max:127'],
            'content' => ['required', 'string', 'max:4000'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'   => 'title is required',
            'title.string'     => 'title must be a string',
            'title.max'        => 'title must not exceed 127 characters',
            'content.required' => 'content is required',
            'content.string'   => 'content must be a string',
            'content.max'      => 'content must not exceed 4000 characters',
        ];
    }
}
