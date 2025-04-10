const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      unique: true,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    token: {
      refreshToken: {
        token: { type: mongoose.Schema.Types.String },
        expiresIn: { type: mongoose.Schema.Types.Date },
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
