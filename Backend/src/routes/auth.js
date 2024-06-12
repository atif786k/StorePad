const Router = require("express");
const passport = require("passport");
const User = require("../schema/userSchema");
// const { hashPassword } = require("../utils/encrypt");
const router = Router();

router.post("/auth/register", async (req, res) => {
    const { body } = req;
    console.log(body);
    // req.password = hashPassword(req.password);
    const newUser = new User(body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json({ msg: "User Created Successfully"});
    } catch (error) {
        res.status(400).json({ msg: "Error creating user" });
    }
});

router.post("/auth/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json({ msg: "Login Successfully" });
});

router.get('/auth/logout', (req, res) => {
    req.logout(()=>{});
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ msg: "Failed to destroy session" });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ msg: "Logged out successfully" });
    });
  });
  

module.exports = router;