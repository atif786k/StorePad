const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "User",
    },
    title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    description: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    deleteAt: {
      type: mongoose.Schema.Types.Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Notes", noteSchema);
module.exports = Notes;
