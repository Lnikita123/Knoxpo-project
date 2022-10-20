const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({

    loggedInUser:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
    },
    isdeleted: {
        type: Boolean,
        default:false
    }
   

   

}, { timestamps: true })

module.exports = mongoose.model('Contact', contactSchema)