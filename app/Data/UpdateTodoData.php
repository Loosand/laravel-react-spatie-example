<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('UpdateTodoRequest')]
class UpdateTodoData extends Data
{
    public function __construct(
        #[StringType, Max(255)]
        public string|Optional $title = new Optional(),
        
        #[StringType]
        public string|null|Optional $description = new Optional(),
        
        public bool|Optional $completed = new Optional(),
    ) {
    }
}
