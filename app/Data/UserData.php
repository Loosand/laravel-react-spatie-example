<?php

declare(strict_types=1);

namespace App\Data;

use App\Models\User;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('User')]
class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public Lazy|Carbon|null $emailVerifiedAt = null,
        public Lazy|Carbon|null $createdAt = null,
        public Lazy|Carbon|null $updatedAt = null,
    ) {
    }

    public static function fromUser(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            emailVerifiedAt: Lazy::create(fn () => $user->email_verified_at),
            createdAt: Lazy::create(fn () => $user->created_at),
            updatedAt: Lazy::create(fn () => $user->updated_at),
        );
    }
}
