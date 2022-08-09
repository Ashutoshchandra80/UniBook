import mongoose from 'mongoose'

// const { Schema } = mongoose;
// mongoose.Promise = global.Promise;

const UserSignupSchema = new mongoose.Schema({
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
        password: {
            type: String,
          },
          isVerified:{
            type: Boolean,
            default: false,
          }

})


 module.export = mongoose.models.User || mongoose.model('UserInfo', UserSignupSchema);
