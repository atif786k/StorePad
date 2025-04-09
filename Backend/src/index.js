const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const routes = require("./routes/index");
const cors = require("cors");
const { connectToDataBase } = require("./db");
require("./utils/cronAutoDelete");

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    },
  })
);
connectToDataBase();
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.get("/db-status", (req, res) => {
  const states = mongoose.STATES;
  const connectionState = mongoose.connection.readyState;
  res.json({
    state: connectionState,
    host: mongoose.connection.host,
    dbName: mongoose.connection.name,
    message: states[connectionState] || "Unknown state",
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port: ${PORT}`);
});
