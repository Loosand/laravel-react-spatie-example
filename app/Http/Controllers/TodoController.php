<?php

namespace App\Http\Controllers;

use App\Data\StoreTodoData;
use App\Data\TodoData;
use App\Data\UpdateTodoData;
use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $todos = auth()->user()->todos()->latest()->get();
        $todoData = TodoData::collect($todos);

        return Inertia::render('Todos/Index', [
            'todos' => $todoData,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoData $data): RedirectResponse
    {
        auth()->user()->todos()->create($data->toArray());

        return redirect()->back()->with('success', 'Todo created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoData $data, Todo $todo): RedirectResponse
    {
        // Ensure the todo belongs to the authenticated user
        if ($todo->user_id !== auth()->id()) {
            abort(403);
        }

        $todo->update($data->toArray());

        return redirect()->back()->with('success', 'Todo updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo): RedirectResponse
    {
        // Ensure the todo belongs to the authenticated user
        if ($todo->user_id !== auth()->id()) {
            abort(403);
        }

        $todo->delete();

        return redirect()->back()->with('success', 'Todo deleted successfully.');
    }
}
