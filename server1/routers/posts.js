const express = require("express");
const posts = express.Router();
const Post = require("../Models/Post");

/// post new post
posts.post("/", async (req, res) => {
  const dbPost = req.body;
  // console.log(req.body);

  res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, PATCH, DELETE");
  Post.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

posts.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort("-updatedAt").exec();
    console.log(posts.length)
    return res.send(posts);
  } catch (err) {
    console.log(err);
  }
});

/// increasing likes
posts.get("/like/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(dbPost);
  try {
    let post = await Post.findOne({ _id: id });
    post.like++;
    await post.save();
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
});

/// comment on the post  -- still working

posts.post("/comment/:id", async (req, res) => {
  const dbPost = req.body;
  try {
    let user = await Post.findOne({ _id: dbPost });
    user.like = user.like + 1;
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = posts;
