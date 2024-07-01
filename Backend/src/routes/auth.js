const Router = require("express");
const passport = require("passport");
const User = require("../schema/userSchema");
const { hashPassword } = require("../utils/encrypt");
const router = Router();

router.post("/auth/register", async (req, res) => {
  const { username, email } = req.body;
  if(!username){ return res.status(400).json({ msg: "username is required" }) }
  if(!email){ return res.status(400).json({ msg: "email is required" }) }
  // if(!password){ return res.status(400).json({ msg: "password is required" }) }

  req.body.password = hashPassword(req.body.password);
  const isUser = await User.findOne({ email: email });
  if(isUser){ return res.json({ msg: "User already exist" }) };

  const newUser = new User({ username, email, password: req.body.password });
  const savedUser = await newUser.save();
  console.log(savedUser)
  return res.status(200).json({
    msg: "User created successfully",
    savedUser
  });

  // const { body } = req;
  // body.password = hashPassword(body.password);
  // const newUser = new User(body);
  // console.log(newUser)
  // try {
  //   const savedUser = await newUser.save();
  //   console.log("in try block: ", savedUser);
  //   res.status(201).json({ msg: "User Created Successfully", user: savedUser });
  // } catch (error) {
  //   res.status(400).json({ msg: "Error creating user", error: error.message });
  // }
});

router.post("/auth/login", passport.authenticate("local"), (req, res) => {
  const { username, password } = req.body;
  if(!username){ return res.status(400).json({ msg: "Incorrect username" }) }
  if(!password){ return res.status(400).json({ msg: "Incorrect password" }) }

  res.status(200).json({
    msg: "Login Successfully",
    userProfile: req.user,
  });

  // if (!req.user.username || !req.user.password) {
  //   res.status(400).json({ msg: "Invalid Credentials" });
  // }
  // res
  //   .status(200)
  //   .json({ msg: "Login Successfully", userProfile: req.user.username });
});

router.get("/auth/user", (req, res) => {
  if (req.user) {
    return res.json({
      msg: "User is authenticated",
      userProfile: {
        user_id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } else {
    return res.status(401).json({ msg: "Login first to continue" });
  }
});

router.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ msg: "Failed to log out" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ msg: "Failed to destroy session" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ msg: "Logged out successfully" });
    });
  });
});

module.exports = router;
