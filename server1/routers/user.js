const express = require("express");
const user = express.Router();
const User = require("../Models/User");
const mongoose = require("mongoose");

user.get("/", async (req, res) => {
  try {
    const users = await User.find({ isAdminVerified: false });
    console.log(users.length);
    return res.send(users);
  } catch (err) {
    console.log(err);
  }
});

user.get("/verify/:id", async (req, res) => {
  try {
    const reg = req.params.id;
    const user = await User.findOne({ registration: reg });
    user.isAdminVerified = true;
    await user.save();
    return res.send(user);
  } catch (err) {
    console.log(err);
  }
})

module.exports = user;
