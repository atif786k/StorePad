const User = require("../schema/userSchema");
const { verifyToken } = require("../tokens/JwtToken");

const validateAccessToken = async (token) => {
  try {
    if (!token) {
      console.error("Access token is missing.");
      return null;
    }
    const verifiedAccessToken = await verifyToken(token);
    console.log("Access token verified successfully.");
    return verifiedAccessToken;
  } catch (error) {
    console.log("Error validating access token: ", error);
    return null;
  }
};

const validateRefreshToken = async (token) => {
  try {
    if (!token) {
      console.error("Refresh token is missing.");
      return null;
    }
    const verifiedRefreshToken = await verifyToken(token);
    if (verifiedRefreshToken.exp * 1000 < Date.now()) {
      console.log("Refresh token has expired.");
      return null;
    }
    const findUser = await User.findOne({ _id: verifiedRefreshToken.id });
    if (!findUser) {
      console.error("User not found for the provided refresh token.");
      return null;
    }
    console.log("Refresh token verified successfully.");
    return verifiedRefreshToken;
  } catch (error) {
    console.log("Error validating refresh token: ", error);
    return null;
  }
};

module.exports = { validateAccessToken, validateRefreshToken };
