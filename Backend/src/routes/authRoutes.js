const Router = require("express");
const router = Router();
const brcypt = require("bcryptjs");
const User = require("../schema/userSchema");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../tokens/JwtToken");
const { setCookies } = require("../helpers/TokenCookies");

router.post("/user-register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are required." });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      msg: "Invalid email format.",
    });
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      msg: "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character",
      success: false,
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "Email already exists. Please login to continue.",
      });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await brcypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      msg: "User registered successfully.",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "An error occured while registering the user.",
      error: error.message,
    });
  }
});

router.post("/user-login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found." });
    }

    const isPasswordValid = await brcypt.compare(password, user.password);
    if (isPasswordValid !== true) {
      return res.status(400).json({ msg: "Invalid Credentials. Try again!" });
    }

    const access_token = generateAccessToken(user._id, user.email);
    const refresh_token = generateRefreshToken(user._id, user.email);

    user.token = {
      refreshToken: {
        token: refresh_token,
        expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    };

    await user.save();

    setCookies(access_token, refresh_token, res);

    res.status(200).json({
      success: true,
      msg: "Logged in successfully.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "An error occured while logging in.",
      error: error.message,
    });
  }
});

module.exports = router;
