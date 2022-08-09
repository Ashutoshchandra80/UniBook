const express = require("express");
const login = express.Router();
const passport = require("passport");
const User = require("../Models/User");

login.post("/", (req, res, next) => {
    passport.authenticate("user", { failureRedirect: "/", failureFlash: "Invalid username or password.", successFlash: true }, async (err, user, info) => {
      try {
        console.log(req.body);
        if (err) {  
          return next(err);
        }
        
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          console.log("user wrong")
          res.status(404).send(new Error("User is not correct"));
        }
        if (user) {
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            console.log("done");
            res.status(200).send(user);
          });
        } else {
          res.status(404).send(new Error("login in server1"));
        }
      } catch (err) {
        console.log("here");
        return res.status(404).send(err);
      }
    })(req, res, next);
  });

  module.exports = login;