const express = require("express");
const bcrypt = require("bcrypt");
const signup = express.Router();
const mailer = require("../misc/mailer");
const User = require("../Models/User");
const randomstring = require("randomstring");



 
signup.post("/", async (req, res) => {
    const dbPost = req.body;
    // console.log(req.body);
  
    //Check if email exists
     const doc = await User.findOne({ email: req.body.email });
     console.log(doc)
    // const doc = 0;
    try {
      if (doc) {
        res.status(404).send("Email exists");
      } else {
        const password = randomstring.generate(7);
        const hashedPassword = await bcrypt.hash(password, 10);
        
        dbPost.password = hashedPassword;
        res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, PATCH, DELETE");
        await User.create(dbPost, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            const html =
              `Hi there
                          <br/> Welcome to Unibook, we are very happy to invite you to our enlarged family.
                          <br/> Hope you enjoy the services available and help us to improve more.
                          <br/> This is just a verification procedure to verify your email. 
                          <br/> <h2>This is your password ` + password;
    
            mailer.sendEmail("medicare2019ee@gmail.com", req.body.email, "Please verify your email", html);
            res.status(201).send(data);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }   
  });

  signup.get("/verify/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const doc = await User.findOne({ password: id });
    if (doc) {
      doc.isVerified = true;
      doc.save();
      // res.status(200).send("Verified"); 
      res.redirect("http://localhost:3000/login");
    } else {
      res.status(404).send("Not found");
    }
  });

  signup.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await User.findOne({ registration: id });
        res.send(doc);
      } catch (err) {
        console.log(err);
      }
  });
  module.exports = signup;