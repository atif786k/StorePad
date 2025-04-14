const Router = require("express");
const router = Router();
const authenticate = require("../middlewares/authenticate");
const authRouter = require("./authRoutes");
const noteRouter = require("./notes");

router.use("/api/auth", authRouter);
router.use("/api/notes", authenticate, noteRouter);

module.exports = router;
