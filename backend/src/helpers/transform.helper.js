const transformTodo = (todo) => {
    if (!todo) return null;

    return {
        id: todo._id.toString(),
        title: todo.title,
        completed: todo.completed,

        timestamps: {
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
        },
    };
};

const transformTodos = (todos) => {
    return todos.map(transformTodo);
};

module.exports = {
    transformTodo,
    transformTodos,
};