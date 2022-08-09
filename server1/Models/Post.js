const mongoose = require("mongoose");

// const { Schema } = mongoose;
// mongoose.Promise = global.Promise;

const post = new mongoose.Schema({
        title: { 
            type: String,
            required: true,
        },
        photo: {
            type: String,  
        },
        like: {
            type: Number,
            default: 0,
        },
        description:{
            type: String,
        },
        comment: {
            type: String,
          },
}
, { timestamps: true }
  )


 module.exports  =  mongoose.model('Post', post);

//  mongoose.models.User ||
