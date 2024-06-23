const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true,
    },
    title: {
        type: mongoose.Schema.Types.String,
    },
    description: {
        type: mongoose.Schema.Types.String
    },
    createdOn: {
        type: Date,
        default: new Date().getTime(),
    }
});

const Notes = mongoose.model("Notes", noteSchema);
module.exports = Notes;
