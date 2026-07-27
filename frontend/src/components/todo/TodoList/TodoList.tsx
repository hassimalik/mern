import TodoItem from "../TodoItem/TodoItem";
import type { Todo } from "@/types/todo";

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onUpdate: (id: string, title: string) => void;
}

export default function TodoList({
    todos,
    onDelete,
    onToggle,
    onUpdate,
}: TodoListProps) {
    if (todos.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
                No todos yet. Add your first task!
            </div>
        );
    }

    return (
        <ul className="space-y-3">
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                />
            ))}
        </ul>
    );
}