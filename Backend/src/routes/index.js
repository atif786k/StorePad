const Router = require("express");
const router = Router();
const authenticate = require("../middlewares/authenticate");
const authRouter = require("./authRoutes");
const noteRouter = require("./notes");
const likedRouter = require("./likedNotes");

router.use("/api/auth", authRouter);
router.use("/api/notes", authenticate, noteRouter);
router.use("/api/activity", authenticate, likedRouter);

module.exports = router;
