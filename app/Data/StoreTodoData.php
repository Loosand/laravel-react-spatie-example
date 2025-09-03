<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('StoreTodoRequest')]
class StoreTodoData extends Data
{
    public function __construct(
        #[Required, StringType, Max(255)]
        public string $title,
        
        #[StringType]
        public string|null $description = null,
    ) {
    }
}
