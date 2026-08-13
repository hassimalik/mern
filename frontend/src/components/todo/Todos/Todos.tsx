"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import Loader from "@/components/common/loader/loader";
import TodoForm from "@/components/todo/TodoForm/TodoForm";
import TodoList from "@/components/todo/TodoList/TodoList";

import type { Todo } from "@/types/todo";

import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from "@/services/todo.service";

export default function Todos() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingIds, setDeletingIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTodos();
    }, []);

    useEffect(() => {
        function handleOffline() {
            toast.error("You are offline", {
                description: "Please check your internet connection.",
            });
        }

        function handleOnline() {
            toast.success("You are back online", {
                description: "Your internet connection has been restored.",
            });
        }

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    async function loadTodos() {
        try {
            setIsLoading(true);

            const data = await getTodos();

            setTodos(data);

        } catch (error) {
            console.error(error);

        } finally {
            setIsLoading(false);
        }
    }

    async function handleCreateTodo(
        event: React.FormEvent
    ) {
        event.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle) return;

        const alreadyExists = todos.some(
            (todo) =>
                todo.title.toLowerCase() ===
                trimmedTitle.toLowerCase()
        );

        if (alreadyExists) {
            toast.warning("Todo already exists", {
                description: "Choose a different title.",
            });

            return;
        }

        try {
            setIsSubmitting(true);

            const newTodo = await createTodo(trimmedTitle);

            console.log("NEW TODO:", newTodo);

            setTodos((prev) => [
                newTodo,
                ...prev,
            ]);

            setTitle("");

            toast.success("Todo created successfully.");

        } catch (error) {
            console.error("Create todo failed:", error);

            toast.error("Failed to create todo", {
                description:
                    "Please check your connection and try again.",
            });

        } finally {
            setIsSubmitting(false);
        }
    }

    function handleReorderTodo(
        fromIndex: number,
        toIndex: number
    ) {
        setTodos((prev) => {

            const newTodos = [...prev];

            const [movedTodo] = newTodos.splice(
                fromIndex,
                1
            );

            newTodos.splice(
                toIndex,
                0,
                movedTodo
            );

            return newTodos;
        });
    }

    async function handleDeleteTodo(id: string) {

        if (deletingIds.includes(id)) return;

        const previousTodos = todos;

        setTodos((prev) =>
            prev.filter(
                (todo) => todo.id !== id
            )
        );

        setDeletingIds((prev) => [
            ...prev,
            id,
        ]);

        try {

            await deleteTodo(id);

            toast.success(
                "Todo deleted successfully"
            );

        } catch (error) {

            setTodos(previousTodos);

            console.error(
                "Delete todo failed:",
                error
            );

        } finally {

            setDeletingIds((prev) =>
                prev.filter(
                    (todoId) => todoId !== id
                )
            );
        }
    }

    async function handleToggleTodo(id: string) {

        const todo = todos.find(
            (todo) => todo.id === id
        );

        if (!todo) return;

        const updatedTodo = {
            ...todo,
            completed: !todo.completed,
        };

        setTodos((prev) =>
            prev.map((item) =>
                item.id === id
                    ? updatedTodo
                    : item
            )
        );

        try {

            await updateTodo(id, {
                completed: updatedTodo.completed,
            });

            toast.success(
                updatedTodo.completed
                    ? "Todo completed"
                    : "Todo marked incomplete"
            );

        } catch (error) {

            toast.error(
                "Something went wrong"
            );

            setTodos((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? todo
                        : item
                )
            );

            console.error(
                "Toggle todo failed:",
                error
            );
        }
    }

    async function handleUpdateTodo(
        id: string,
        title: string
    ) {

        const previousTodos = todos;

        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        title,
                    }
                    : todo
            )
        );

        try {

            await updateTodo(id, {
                title,
            });

            toast.success(
                "Todo updated"
            );

        } catch (error) {

            setTodos(previousTodos);

            console.error(
                "Update todo failed:",
                error
            );
        }
    }

    return (
        <main className="min-h-screen rounded-xl bg-[#faf9f7]">

            {isLoading && <Loader />}

            {/* Main content */}
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-12 sm:px-8">

                {/* Header */}
                <header className="mb-10 text-center">

                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#ca5c1d]">
                        Personal Workspace
                    </p>

                    <h1 className="font-script text-4xl font-bold text-[#000000] sm:text-5xl">
                        My Tasks
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                        Keep your day organized, one task at a time.
                    </p>

                </header>

                {/* Todo application */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

                    {/* Form */}
                    <div className="mb-7">

                        <TodoForm
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            onSubmit={handleCreateTodo}
                            isSubmitting={isSubmitting}
                        />

                    </div>

                    {/* Task header */}
                    <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">

                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">
                                Your tasks
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                {todos.length}{" "}
                                {todos.length === 1
                                    ? "task"
                                    : "tasks"}
                            </p>
                        </div>

                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-[#ca5c1d]">
                            {todos.filter(
                                (todo) => !todo.completed
                            ).length}{" "}
                            remaining
                        </span>

                    </div>

                    {/* Todo list */}
                    <TodoList
                        todos={todos}
                        onDelete={handleDeleteTodo}
                        onToggle={handleToggleTodo}
                        onUpdate={handleUpdateTodo}
                        deletingIds={deletingIds}
                        onReorder={handleReorderTodo}
                    />

                </section>

            </div>

            {/* Footer */}
            <footer className="overflow-hidden border-t border-gray-200 bg-white py-5">
                <div className="whitespace-nowrap">
                    <div className="inline-block animate-marquee text-[17px] text-gray-500">
                        <span className="font-bold text-red-700">
                            Tip:
                        </span>{" "}
                        Double-click a todo to edit it.
                    </div>
                </div>
            </footer>
        </main>
    );
}