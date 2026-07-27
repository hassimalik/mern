const API_URL = "http://localhost:5000/api/todos";
export async function getTodos() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }

    const result = await response.json();

    return result.data;
}

export async function createTodo(title: string) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            completed: false,
        }),
    });

    if (!response.ok) throw new Error("Failed to create todo");

    return response.json();
}

export async function updateTodo(id: string, data: object) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to update todo");

    return response.json();
}

export async function deleteTodo(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete todo");

    return response.json();
}