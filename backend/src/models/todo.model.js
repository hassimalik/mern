
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


// Add index for faster sorting by newest todos
todoSchema.index({
    createdAt: -1,
});


const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;