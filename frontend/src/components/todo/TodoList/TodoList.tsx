"use client";

import { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import type { Todo } from "@/types/todo";

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onUpdate: (id: string, title: string) => void;
    onReorder: (fromIndex: number, toIndex: number) => void;
    deletingIds: string[];
}

export default function TodoList({
    todos,
    onDelete,
    onToggle,
    onUpdate,
    deletingIds,
    onReorder,
}: TodoListProps) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    if (todos.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
                No todos yet. Add your first task!
            </div>
        );
    }

    return (
        <ul className="space-y-3">
            {todos
                .filter((todo): todo is Todo => todo != null)
                .map((todo, index) => (
                    <div
                        key={todo.id}
                        draggable
                        onDragStart={() => {
                            setDraggedIndex(index);
                        }}
                        onDragEnd={() => {
                            setDraggedIndex(null);
                        }}
                        onDragOver={(event) => {
                            event.preventDefault();
                        }}
                        onDrop={(event) => {
                            event.preventDefault();

                            if (draggedIndex === null) return;

                            if (draggedIndex === index) {
                                setDraggedIndex(null);
                                return;
                            }

                            onReorder(draggedIndex, index);

                            setDraggedIndex(null);
                        }}
                        className={
                            draggedIndex === index
                                ? "opacity-40"
                                : "opacity-100"
                        }
                    >
                        <TodoItem
                            todo={todo}
                            onDelete={onDelete}
                            onToggle={onToggle}
                            onUpdate={onUpdate}
                            deletingIds={deletingIds}
                        />
                    </div>
                ))}
        </ul>
    );
}
