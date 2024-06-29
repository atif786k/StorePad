const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'User',
    },
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: new Date().getTime(),
    }
});

const Notes = mongoose.model("Notes", noteSchema);
module.exports = Notes;
