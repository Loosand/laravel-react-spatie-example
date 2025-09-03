declare namespace App.Data {
    export type StoreTodoRequest = {
        title: string;
        description: string | null;
    };
    export type Todo = {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: string;
        updatedAt: string;
        user?: App.Data.User | null;
    };
    export type UpdateTodoRequest = {
        title?: string;
        description?: string | null;
        completed?: boolean;
    };
    export type User = {
        id: number;
        name: string;
        email: string;
        emailVerifiedAt?: string | null;
        createdAt?: string | null;
        updatedAt?: string | null;
    };
}
