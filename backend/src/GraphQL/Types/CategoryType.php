<?php
// src/GraphQL/Types/CategoryType.php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategoryType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Category',
            'fields' => [
                'id' => [
                    'type' => Type::nonNull(Type::id()),
                    'description' => 'The unique ID of the category',
                ],
                'name' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The name of the category',
                ]
            ]
        ]);
    }
}
