import { useState } from "react";

import Button from "@/components/common/button/Button";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onUpdate: (id: string, title: string) => void;
    deletingIds: string[];
}

export default function TodoItem({
    todo,
    onDelete,
    onToggle,
    onUpdate,
    deletingIds
}: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);

    function handleSave() {
        const trimmedTitle = editedTitle.trim();

        if (!trimmedTitle) {
            setEditedTitle(todo.title);
            setIsEditing(false);
            return;
        }

        onUpdate(todo._id, trimmedTitle);
        setIsEditing(false);
    }

    function handleKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>
    ) {
        if (event.key === "Enter") {
            handleSave();
        }

        if (event.key === "Escape") {
            setEditedTitle(todo.title);
            setIsEditing(false);
        }
    }

    return (
        <li className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
            <div className="mr-4 flex flex-1 items-center gap-3">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo._id)}
                    className="h-4 w-4 cursor-pointer accent-blue-600"
                />

                {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="flex-1 rounded-md border border-blue-400 px-2 py-1 outline-none focus:ring-2 focus:ring-blue-300"
                    />
                ) : (
                    <span
                        onDoubleClick={() => setIsEditing(true)}
                        className={`flex-1 cursor-text select-none ${todo.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-800"
                            }`}
                    >
                        {todo.title}
                    </span>
                )}
            </div>

            <Button
                disabled={deletingIds.includes(todo._id)}
                onClick={() => onDelete(todo._id)}
            >
                {
                    deletingIds.includes(todo._id)
                        ? "Deleting..."
                        : "Delete"
                }
            </Button>
        </li>
    );
}