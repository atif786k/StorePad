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
    res.status(201).json({ msg: "User Created Successfully", user: savedUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error creating user", error: error.message });
  }
});

router.post("/auth/login", passport.authenticate("local"), (req, res) => {
  console.log(req.user.username);
  res
    .status(200)
    .json({ msg: "Login Successfully", userProfile: req.user.username });
});

router.get("/auth/user", (req, res) => {
  if (req.user) {
    res.json({
      msg: "Fetched User Profile",
      userProfile: {
        username: req.user.username,
        email: req.user.email,
      },
    });
  } else {
    res.status(401).json({ msg: "Login first to continue" });
  }
});

router.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to destroy session" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
