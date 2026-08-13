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


module.exports = {
    transformTodo,
};