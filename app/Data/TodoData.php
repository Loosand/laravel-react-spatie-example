<?php

declare(strict_types=1);

namespace App\Data;

use App\Models\Todo;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('Todo')]
class TodoData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string|null $description,
        public bool $completed,
        public Carbon $createdAt,
        public Carbon $updatedAt,
        public Lazy|UserData|null $user = null,
    ) {
    }

    public static function fromTodo(Todo $todo): self
    {
        return new self(
            id: $todo->id,
            title: $todo->title,
            description: $todo->description,
            completed: $todo->completed,
            createdAt: $todo->created_at,
            updatedAt: $todo->updated_at,
            user: Lazy::create(fn () => UserData::fromUser($todo->user)),
        );
    }
}
