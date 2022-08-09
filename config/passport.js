import stratlocal from "passport-local";
// const LocalStrategy = require("passport-local").Strategy;
import bcrypt from "bcrypt";
import user from "@server/models/SignUser"

//passport local strategy
const init = (passport) => {
    //strategy for user login
    passport.use(
      "user",
      new stratlocal.Strategy({ usernameField: "email" }, async (email, password, done) => {
        user.findOne({ email: email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }
          if (!user.isVerified) {
            return done(null, false, { message: "User not verified" });
          }
          try {
            //comparing the password
            bcrypt.compare(password, user.password).then((match) => {
              if (match) {
                return done(null, user, { message: "Logged in success" });
              } else return done(null, false, { message: "Wrong Password" });
            });
          } catch (err) {
            //error
            return done(null, false, { message: "Something went wrong" });
          }
          return done(null, user);
        });
      })
    );
  
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  };
  module.exports = init;