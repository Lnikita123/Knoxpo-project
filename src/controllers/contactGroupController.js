const contactGroupModel = require("../models/contactGroupModel");
const jwt = require("jsonwebtoken");
const Validator= require("../validator/validation");


const createGroup= async function (req, res) {
    try {
     let data= req.body
     const {name, mobile, groupName}= data           // DEstructuring

     if (!Validator.isValidRequestBody(data)) {              // validation and logics are used.
         return res.status(400).send({status: false, msg: "please provide some data"})
     }

   if (!name) {
       return res.status(400).send({status: false, msg: "please provide name."})
   }
   
   if(!mobile) {
       return res.status(400).send({status: false, msg: "please provide phone number"})
   }
   if (!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(mobile)) {    ////Regex for testing mobile number
       return  res.status(400).send({ status: false, msg: "It's not a valid mobile number" })
   }

   if (!groupName) {
       return res.status(400).send({ status: false, msg: "Please provide groupName" })
   }

let saveData= await contactGroupModel.create(data)                                       // group creation.
   res.status(201).send({status:true, msg:"successfully data created", data:saveData }) 
} catch(err) {
   console.log(err)
   res.status(500).send({status:false, msg: err.message})
}

}

const getContactGroup= async function(req, res){
  try{
      let queryParams= req.body

      const {groupName} = queryParams

      if (!groupName){                           // validation for checking group name.
          return res.status(400).send({status: false, msg: "Please provide groupName."})
      }
      
      const details = await contactGroupModel.find({...queryParams})             //fetching the group using spread operator.
      res.status(200).send({status:true, message: "feched data succesfully", data: details})
  }
  catch(err){
      console.log(err)
      res.status(500).send({status:false, msg: err.message})
  }
}


const getallGroupOfUser = async function (req, res) {
  try{
    let queryParams= req.body

    const {name} = queryParams

    if (!name){
        return res.status(400).send({status: false, msg: "Please provide name."})
    }
    
    const details = await contactGroupModel.find({...queryParams})                   //fetching the allgroup using spread operator.
    res.status(200).send({status:true, message: "feched data succesfully", data: details})
}
catch(err){
    console.log(err)
    res.status(500).send({status:false, msg: err.message})
}
}

const updateGroup = async function (req, res) {

    try {
    const {name,groupName,mobile } = req.body
    let userId = req.params.userId
    let updateCategoryBody = await contactGroupModel.findOneAndUpdate({userId: userId }, { $set: { name: name, groupName: groupName,mobile:mobile } }, { new: true }) 
    //updating all the fields using $set.
    return res.status(200).send({ status: true, messege: "contactGroup updated successfully", data: updateCategoryBody })

}
catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
}

}

const deletegroup = async function (req, res) {

  try {
  const {name,groupName,mobile, isdeleted } = req.body
  let userId = req.params.userId
  let updateCategoryBody = await contactGroupModel.findOneAndUpdate({userId: userId }, { $set: { name: name, groupName: groupName,mobile:mobile, isdeleted: isdeleted } }, { new: true })
  //Making isdeleted true.
  return res.status(200).send({ status: true, messege: "contactGroup deleted successfully", data: updateCategoryBody })

}
catch (err) {
  return res.status(500).send({ status: false, msg: err.message })
}
}


// exporting all the modules.
module.exports ={createGroup,getContactGroup,getallGroupOfUser,updateGroup,deletegroup}
