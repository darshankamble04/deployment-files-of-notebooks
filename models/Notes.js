const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    notebook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'notebook'
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    color: {
        type: String,
    },
    date: {
        type: Date,
        require: true,
    }
})

module.exports = mongoose.model("Notes", NotesSchema);