const User = require("../schema/userSchema");
const { setCookies } = require("../helpers/TokenCookies");
const {
  validateAccessToken,
  validateRefreshToken,
} = require("../helpers/TokenValidator");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../tokens/JwtToken");

const authenticate = async (req, res, next) => {
  const { access_token, refresh_token } = req.cookies;

  const validAccessToken = await validateAccessToken(access_token);
  const validRefreshToken = await validateRefreshToken(refresh_token);

  if (validAccessToken && validRefreshToken) {
    console.log("Both token are valid. Authorizing user");
    req.user = validAccessToken;
    return next();
  }
  if (!validAccessToken && validRefreshToken) {
    try {
      const newAccessToken = generateAccessToken(
        validRefreshToken?.id,
        validRefreshToken?.email
      );
      const newRefreshToken = generateRefreshToken(
        validRefreshToken?.id,
        validRefreshToken?.email
      );

      const saveNewRefreshToken = await User.findByIdAndUpdate(
        { _id: validRefreshToken.id },
        {
          $set: {
            "tokens.refreshToken.token": newRefreshToken,
            "tokens.refreshToken.expiresIn": new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ),
          },
        },
        { new: true }
      );
      if (!saveNewRefreshToken) {
        return res.status(400).json({
          msg: "Error saving the new refresh token.",
        });
      }
      setCookies(newAccessToken, newRefreshToken, res);
      req.user = validRefreshToken;
      console.log("New access token generated and sent to client. Authorizing user");
      return next();
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, msg: "Error generating new access token" });
    }
  }
  return res.status(401).json({ success: false, msg: "Unauthorized" });
};

module.exports = authenticate;
