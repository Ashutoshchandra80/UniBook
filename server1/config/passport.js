const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/User");
const bcrypt = require("bcrypt");

//passport local strategy
const init = (passport) => {
    //strategy for user login
    passport.use(
      "user",
      new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }
          try {
            //comparing the password
            bcrypt.compare(password, user.password).then(async (match) => {
              if (match&&user.isAdminVerified) {
                user.isVerified = true;
                await user.save();
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
