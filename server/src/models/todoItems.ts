const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema({
    item:{
        type: String,
        required: true
    }

})

module.exports = mongoose.model('todo',todoItemSchema);