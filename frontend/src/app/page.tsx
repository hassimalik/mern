"use client";

import { useEffect, useState } from "react";

import TodoForm from "@/components/todo/TodoForm/TodoForm";
import TodoList from "@/components/todo/TodoList/TodoList";

import type { Todo } from "@/types/todo";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/services/todo.service";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    console.log("fetchTodos called");
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateTodo(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      await createTodo(title);
      setTitle("");
      await fetchTodos();
      setIsSubmitting(false)
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteTodo(id: string) {
    try {
      await deleteTodo(id);
      await fetchTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleToggleTodo(id: string) {
    const todo = todos.find((todo) => todo._id === id);

    if (!todo) return;

    try {
      await updateTodo(id, {
        completed: !todo.completed,
      });

      await fetchTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateTodo(
    id: string,
    title: string
  ) {
    try {
      await updateTodo(id, {
        title,
      });

      await fetchTodos();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <div className="mx-auto w-full max-w-2xl flex-1 p-8">
        <h1 className="mb-8 text-center font-roboto text-4xl font-bold">
          My Tasks
        </h1>

        <TodoForm
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onSubmit={handleCreateTodo}
          isSubmitting={isSubmitting}
        />

        <div className="mt-6">
          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
            onUpdate={handleUpdateTodo}
          />
        </div>
      </div>

      <footer className="border-t border-gray-200 bg-white py-5">
        <p className="text-center text-sm text-gray-500">
          <span className="text-red-700 font-bold text-g">Tip:</span> Double-click to edit it.
        </p>
      </footer>
    </main>
  );
}