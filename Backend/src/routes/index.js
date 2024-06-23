const Router = require("express");
const router = Router();

const authRouter = require("./auth");
const noteRouter = require("./notes");

router.use(authRouter);
router.use(noteRouter);

module.exports = router;