const Todo = require("../models/todo.model");

const getTodos = async (req, res) => {
    try{
        const todos = await Todo.find()
        .sort({createdAt: -1})
        .lean();
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos,
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

const createTodo = async (req, res) =>{
    try{
        const todo = await Todo.create(req.body);
        res.status(201).json({
            success: true,
            data: todo,
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}


const updateTodo = async (req, res) => {
    try {
        const { title, completed } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                title,
                completed,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        res.status(200).json({
            success: true,
            data: updatedTodo,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if(!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            data: deletedTodo
    })
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
}