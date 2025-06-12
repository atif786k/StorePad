const Router = require("express");
const LikedNotes = require("../schema/likedNotesSchema");
const router = Router();

router.post("/:noteId/liked-note", async (req, res) => {
  const userId = req.user?.id;
  const {
    params: { noteId },
  } = req;
  try {
    const alreadyLiked = await LikedNotes.findOne({ userId, noteId });
    if (alreadyLiked) {
      return res.status(400).json({ msg: "Notes is already liked" });
    }

    const like = new LikedNotes({ userId, noteId });
    await like.save();

    res.status(201).json({
      success: true,
      msg: "Note liked successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error occurred while liking the note",
      error: error.message,
    });
  }
});

router.delete("/:noteId/unliked-note", async (req, res) => {
  const userId = req.user?.id;
  const {
    params: { noteId },
  } = req;
  try {
    await LikedNotes.findOneAndDelete({ userId, noteId });
    res.status(204).json({
      success: true,
      msg: "Unlike note successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error occurred while unliking the note",
      error: error.message,
    });
  }
});

router.get("/fetch-liked-notes", async (req, res) => {
  const userId = req.user?.id;
  try {
    const likedNotes = await LikedNotes.find({ userId });
    res.status(200).json({
      success: true,
      msg:
        likedNotes.length === 0
          ? "No liked notes found"
          : "Fetch liked notes successfully",
      data: likedNotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error occurred while fetching the liked notes",
      error: error.message,
    });
  }
});

module.exports = router;
