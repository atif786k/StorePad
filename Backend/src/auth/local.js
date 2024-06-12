const passport = require("passport");
const Strategy = require("passport-local");
const User = require("../schema/userSchema");
// const { comparePassword } = require("../utils/encrypt")

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser( async (id, done) => {
    try {
        const findUser = await User.findById(id);
        if(!findUser) throw new Error("Sorry, user not found");
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
})

module.exports = passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw new Error("Sorry, user not found");
      if(findUser.password !== password){
        throw new Error("INvalid Credentials sorry")
      }
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
