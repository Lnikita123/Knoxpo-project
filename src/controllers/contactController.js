const contactModel = require("../models/contactModel");
const Validator= require("../validator/validation")


  
  const createContact= async function (req, res) {
     try {
      let data= req.body
      const {name, mobile, loggedInUser}= data   // Destructuring used here.

      if (!Validator.isValidRequestBody(data)) {     // validation if we are not providing anything inside a body.
          return res.status(400).send({status: false, msg: "please provide some data"})
      }

      if (!loggedInUser) {
        return res.status(400).send({status: false, msg: "please provide loggedInUser."})
    }

      if (!name) {
        return res.status(400).send({status: false, msg: "please provide name."})
    }

    if (!name) {
        return res.status(400).send({status: false, msg: "please provide name."})
    }
    
    if(!mobile) {
        return res.status(400).send({status: false, msg: "please provide phone number"})
    }
    if (!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(mobile)) {     //regex used for testing mobile number
        return  res.status(400).send({ status: false, msg: "It's not a valid mobile number" })
    }
   
let saveData= await contactModel.create(data)                                           // cantact creation succesfully.
    res.status(201).send({status:true, msg:"successfully created", data:saveData }) 
} catch(err) {
    console.log(err)
    res.status(500).send({status:false, msg: err.message})
}

}

const getContact= async function(req, res){
    try{
        let queryParams= req.body

        const {loggedInUser} = queryParams

        if (!loggedInUser){
            return res.status(400).send({status: false, msg: "Please provide loggedInUser."})
        }
        
        const details = await contactModel.find({...queryParams})            // spread operator used here for fecthing contact.
        res.status(200).send({status:true, message: "feched data succesfully", data: details})
    }
    catch(err){
        console.log(err)
        res.status(500).send({status:false, msg: err.message})
    }
}

const getParticularContact = async function (req, res) {
    try{
      let queryParams= req.body
  
      const {name} = queryParams
  
      if (!name){
          return res.status(400).send({status: false, msg: "Please provide name."})
      }
      
      const details = await contactModel.find({...queryParams})              // spread operator used here for fecthing  particular contact.
      res.status(200).send({status:true, message: "feched data succesfully", data: details})
  }
  catch(err){
      console.log(err)
      res.status(500).send({status:false, msg: err.message})
  }
  }

const updateContact = async function (req, res) {

    try {
    const {name, mobile } = req.body
    let userId = req.params.userId
    let updateCategoryBody = await contactModel.findOneAndUpdate({userId: userId }, { $set: { name: name,mobile:mobile } }, { new: true })
   // $set is used for updation all the fields.
    return res.status(200).send({ status: true, messege: "contact details updated successfully", data: updateCategoryBody })

}

catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
}

}

const deleteContact = async function (req, res) {

    try {
    const {mobile, isdeleted } = req.body
    let userId = req.params.userId
    let updateCategoryBody = await contactModel.findOneAndUpdate({userId: userId }, { $set: { mobile:mobile, isdeleted: isdeleted } }, { new: true })
  
    return res.status(200).send({ status: true, messege: "contact deleted successfully", data: updateCategoryBody })
  
  }
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
  }




// Exporting all the modules.
module.exports= {createContact,getContact,updateContact,getParticularContact, deleteContact}