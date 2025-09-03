<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::resource('todos', TodoController::class)->except(['create', 'show', 'edit'])->names([
        'index' => 'todos.index',
        'store' => 'todos.store',
        'update' => 'todos.update',
        'destroy' => 'todos.destroy',
    ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
