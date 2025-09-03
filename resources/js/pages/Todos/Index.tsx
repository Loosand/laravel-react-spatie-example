import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import todosRoutes from '@/routes/todos';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface TodosIndexProps {
    todos: App.Data.Todo[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Todos',
        href: todosRoutes.index().url,
    },
];

export default function TodosIndex({ todos }: TodosIndexProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<App.Data.StoreTodoRequest>({
        title: '',
        description: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(todosRoutes.store().url, {
            onSuccess: () => {
                reset();
                setIsDialogOpen(false);
            },
        });
    };

    const toggleTodo = (todo: App.Data.Todo) => {
        router.patch(todosRoutes.update({ todo: todo.id }).url, {
            completed: !todo.completed,
        });
    };

    const deleteTodo = (todo: App.Data.Todo) => {
        if (confirm('确定要删除这个 Todo 吗？')) {
            router.delete(todosRoutes.destroy({ todo: todo.id }).url);
        }
    };

    const completedTodos = todos.filter((todo) => todo.completed);
    const pendingTodos = todos.filter((todo) => !todo.completed);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todos" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Todo 列表</h1>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">管理你的待办事项</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                添加 Todo
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>添加新的 Todo</DialogTitle>
                                <DialogDescription>创建一个新的待办事项。点击保存完成添加。</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">标题</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="输入 todo 标题"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">描述 (可选)</Label>
                                    <Input
                                        id="description"
                                        value={data.description || ''}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="输入 todo 描述"
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        取消
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? '保存中...' : '保存'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Pending Todos */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Circle className="h-5 w-5 text-blue-500" />
                                待完成 ({pendingTodos.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {pendingTodos.length === 0 ? (
                                <p className="py-8 text-center text-sm text-neutral-500">没有待完成的任务</p>
                            ) : (
                                pendingTodos.map((todo) => (
                                    <div
                                        key={todo.id}
                                        className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800/50"
                                    >
                                        <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo)} className="mt-0.5" />
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">{todo.title}</h3>
                                            {todo.description && (
                                                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{todo.description}</p>
                                            )}
                                            <p className="mt-2 text-xs text-neutral-500">创建于 {new Date(todo.createdAt).toLocaleString('zh-CN')}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteTodo(todo)}
                                            className="text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* Completed Todos */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                已完成 ({completedTodos.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {completedTodos.length === 0 ? (
                                <p className="py-8 text-center text-sm text-neutral-500">没有已完成的任务</p>
                            ) : (
                                completedTodos.map((todo) => (
                                    <div
                                        key={todo.id}
                                        className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-green-50 p-3 dark:border-neutral-700 dark:bg-green-900/20"
                                    >
                                        <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo)} className="mt-0.5" />
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-medium text-neutral-900 line-through opacity-75 dark:text-neutral-100">
                                                {todo.title}
                                            </h3>
                                            {todo.description && (
                                                <p className="mt-1 text-sm text-neutral-600 line-through opacity-75 dark:text-neutral-400">
                                                    {todo.description}
                                                </p>
                                            )}
                                            <p className="mt-2 text-xs text-neutral-500">完成于 {new Date(todo.updatedAt).toLocaleString('zh-CN')}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteTodo(todo)}
                                            className="text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                {todos.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 rounded-full bg-neutral-100 p-6 dark:bg-neutral-800">
                            <Circle className="h-12 w-12 text-neutral-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-neutral-900 dark:text-neutral-100">还没有任何 Todo</h3>
                        <p className="mb-6 max-w-sm text-neutral-500 dark:text-neutral-400">开始创建你的第一个待办事项来管理你的任务吧！</p>
                        <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            创建第一个 Todo
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
