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
        res.status(200).json({ msg: "New Note Created", savedNote });
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

router.get("/note/fetch-note/:id", async (req, res) => {
    const { params: { id } } = req;
    if(!req.user){ return res.status(401).json({ msg: "Not Authenticated" }) };

    try {
        const singleNote = await Notes.findById(id);
        if(!singleNote){ return res.json({msg: "Note not found"}) };
        res.status(200).json({msg: "Note found successfully", singleNote})
    } catch (error) {
        res.status(500).json({msg:"Some error occured", errorMsg: error});
    }
})

router.put("/note/edit-note/:id", async (req, res) => {
    if(!req.user){return res.status(401).json({msg: "Not Authenticated"})}
    const { params: { id } } = req;
    const { title, description } = req.body;

    if(!title && !description){return res.status(400).json({msg: "No changes done"})};

    try{
        const note = await Notes.findById(id);
        if(!note){return res.json({msg: "Note not found"})}
        if(title){ note.title = title };
        if(description){ note.description = description };

        const updatedNote = await note.save();
        res.status(200).json({msg: "Note updated successfully", updatedNote});
    }
    catch(error){
        res.status(500).json({msg: "Some error occured", errorMsg: error.message});
    }

 })

router.delete("/note/delete-note/:id", async (req, res) => {
    const { params: { id } } = req;
    if(!req.user){ return res.status(401).json({msg: "Not Authenticated"}) };

    try {
        const findNote = await Notes.findById(id);
        if(!findNote){return res.json({msg: "Note not found"})};
        const deleteNote = await Notes.deleteOne({_id: id, userId: req.user._id});
        res.status(200).json({msg: "Note deleted successfully", deleteNote});
    } catch (error) {
        res.status(500).json({msg: "Some error occured", errorMsg: error});
    }
})

module.exports = router;
