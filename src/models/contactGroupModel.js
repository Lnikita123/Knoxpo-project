const mongoose = require('mongoose')

const contactGroupSchema = new mongoose.Schema({

    name: {
        type: String
        },

    groupName: {
        type: String,
       
    },
    mobile: {
        type: String,
    },
    isdeleted:{
        type:Boolean,
        default:false
    }









}, { timestamps: true })

module.exports = mongoose.model('Group', contactGroupSchema)
