const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const routes = require("./routes/index");
const mongoose = require("mongoose");
const cors = require("cors");
require("./auth/local");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true, optionsSuccessStatus: 200 }));

mongoose.connect("mongodb://localhost/StorePad")
    .then(() => console.log("Connected to MongoDB Database"))
    .catch((error) => console.log(error));

app.use(cookieParser("atifTheDeveloper"));
app.use(session({
    secret: 'atifTheDeveloper',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60000 * 60,
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Home Page 🏠");
});

app.listen(PORT, (req, res) => {
  console.log("Listening on Port : ", PORT);
});
