const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error("JWT_SECRET is missing in the environment variables.");
  process.exit(1);
}

const generateAccessToken = (id, email) => {
  const token = jwt.sign({ id, email }, jwtSecret, {
    expiresIn: "1h",
  });
  return token;
};

const generateRefreshToken = (id, email) => {
  const token = jwt.sign({ id, email }, jwtSecret, {
    expiresIn: "7d",
  });
  return token;
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, payload) => {
      if (err) {
        console.error("Token verification failed: ", err.message);
        return reject(new Error("Token verification failed."));
      } else {
        console.log("Token verified successfully.");
        return resolve(payload);
      }
    });
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
