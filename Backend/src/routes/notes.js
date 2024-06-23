const Router = require("express");
const router = Router();
const Notes = require("../schema/noteSchema");

router.post("/note/create-note", async (req, res) => {
    const { body } = req;
    console.log(body.title)
    if(req.user){
        body.userId = req.user._id;
    } else{
        res.status(401).json({ msg: "Create an account to create a note !" })
    }
    const newNote = new Notes(body);
    try {
        const savedNote = await newNote.save();
        res.status(200).json({ msg: "Note Created Successfully", note: savedNote })
    } catch (error) {
        res.status(400).json({ msg: "Failed creating the note !", error: error.message })        
    }
})

module.exports = router;