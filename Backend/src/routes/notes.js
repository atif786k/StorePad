const Router = require("express");
const router = Router();
const Notes = require("../schema/noteSchema");

router.post("/create-note", async (req, res) => {
  const { title, description, deleteAfter } = req.body;

  try {
    if (!title || !description) {
      return res
        .status(400)
        .json({ msg: "Please provide all the required fields." });
    }

    let deleteAt = null;
    if (deleteAfter) {
      deleteAt = new Date(Date.now() + Number(deleteAfter));
    }
    const newNote = new Notes({
      userId: req.user.id,
      title,
      description,
      deleteAt,
    });
    await newNote.save();
    res.status(201).json({
      success: true,
      msg: "Note created successfully",
      newNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to create note",
      error: error.message,
    });
  }
});

router.get("/fetch-note", async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.user.id });
    if (!notes) {
      return res.json({ msg: "No Notes Found" });
    }
    res.status(200).json({ msg: "Notes Fetched", notes });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Some error occured while fetching the notes",
      error: error.message,
    });
  }
});

router.get("/fetch-note/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const singleNote = await Notes.findById(id);
    if (!singleNote) {
      return res.json({ msg: "Note not found" });
    }
    res.status(200).json({ msg: "Note found successfully", singleNote });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Some error occured while fetching",
      error: error.message,
    });
  }
});

router.put("/edit-note/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  const { title, description, deleteAfter } = req.body;

  if (!title && !description && deleteAfter === undefined) {
    return res.status(400).json({ msg: "No changes done" });
  }

  try {
    const note = await Notes.findById(id);
    if (!note) {
      return res.json({ msg: "Note not found" });
    }
    if (title) {
      note.title = title;
    }
    if (description) {
      note.description = description;
    }

    if (deleteAfter) {
      const deleteAt = new Date(Date.now() + Number(deleteAfter));
      note.deleteAt = deleteAt;
    } else {
      note.deleteAt = null;
    }

    const updatedNote = await note.save();
    res
      .status(200)
      .json({ success: true, msg: "Note updated successfully", updatedNote });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Some error occured while updating the note",
      error: error.message,
    });
  }
});

router.delete("/delete-note/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const findNote = await Notes.findById(id);
    if (!findNote) {
      return res.json({ msg: "Note not found" });
    }
    await Notes.deleteOne({ _id: id, userId: req.user.id });
    res.status(200).json({ success: true, msg: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Some error occured while deleting the note.",
      error: error.message,
    });
  }
});

module.exports = router;
