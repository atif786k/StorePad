const Router = require("express");
const router = Router();
const Notes = require("../schema/noteSchema");
const passport = require("passport");


router.post("/note/create-note", async (req, res) => {
    const { title, description } = req.body;
    // const { _id } = req.user;

    if(!title){ return res.status(400).json({ msg: "title is required" }) };
    if(!description){ return res.status(400).json({ msg: "description is required" }) };

    try {
        const newNote = new Notes({ userId: req.user._id, title, description });
        const savedNote = await newNote.save();
        res.status(200).json({ msg: "Note Created", savedNote });
    } catch (error) {
        res.json({ msg: "Failed to create the note" , errorMsg: error});
    }
});

router.get("/note/fetch-note", async (req, res) => {
    if(!req.user){ return res.status(401).json({ msg: "Not Authenticated" }) };

    try {
        const notes = await Notes.find({ userId: req.user._id });
        if(!notes){ return res.json({ msg: "No Notes Found" }) };
        res.status(200).json({ msg: "Notes Fetched", notes });
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch notes", errorMsg: error });
    }

    // try {
    //     const notes = await Notes.find({ userId: req.user._id });
    //     res.status(200).json({ msg: "Notes fetched successfully", notes });
    // } catch (error) {
    //     res.status(500).json({ msg: "Failed to fetch notes", error: error.message });
    // }
});

module.exports = router;
