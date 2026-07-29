import type { Todo } from "@/types/todo";

const API_URL = "http://localhost:5000/api/todos";

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

async function request<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(url, options);

    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
    }

    return result.data;
}

export function getTodos(): Promise<Todo[]> {
    return request<Todo[]>(API_URL);
}

export function createTodo(title: string): Promise<Todo> {
    return request<Todo>(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            completed: false,
        }),
    });
}

export function updateTodo(
    id: string,
    data: Partial<Todo>
): Promise<Todo> {
    return request<Todo>(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export function deleteTodo(id: string): Promise<Todo> {
    return request<Todo>(`${API_URL}/${id}`, {
        method: "DELETE",
    });
}