const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    mobile: {
        type:String,
    },
    name: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
  
}, {timestamps: true})

module.exports = mongoose.model("user", userSchema)