const mongoose = require("mongoose");

const likedNotesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Notes",
  },
  likedAt: {
    type: Date,
    default: Date.now,
  },
});

const LikedNotes = mongoose.model("LikedNotes", likedNotesSchema);
module.exports = LikedNotes;
