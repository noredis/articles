<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShowArticleRequest extends FormRequest
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
            'page'  => ['gt:0'],
            'limit' => ['gt:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'page.gt'  => 'page should be greather than 1',
            'limit.gt' => 'limit should be greather than 1',
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'page' => $this->query('page', 1),
            'limit' => $this->query('limit', 10),
        ]);
    }
}
