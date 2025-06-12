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
const MongoStore = require("connect-mongo");
require("./utils/cronAutoDelete");

dotenv.config();

const PORT = process.env.PORT || 5000;

const mongoURI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB_APP_NAME}`;

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
    store: MongoStore.create({
      mongoUrl: mongoURI,
    }),
    cookie: {
      httpOnly: true,
      secure: true,
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
