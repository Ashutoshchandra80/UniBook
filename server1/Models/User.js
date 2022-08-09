const mongoose = require("mongoose");

// const { Schema } = mongoose;
// mongoose.Promise = global.Promise;

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    registration: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    idCard: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
    },
    profile_pic: {
      type: String,
    },
    interests: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdminVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", user);

//  mongoose.models.User ||
