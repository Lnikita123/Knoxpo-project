const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")
const Validator= require("../validator/validation")


  
  const createUser= async function (req, res) {
     try {
      let data= req.body
      const {name, mobile, emailId, password}= data        // Destructuring 

      if (!Validator.isValidRequestBody(data)) {             // Validation and logics
          return res.status(400).send({status: false, msg: "please provide some data"})
      }

    if (!name) {                                               // if we are not providing name inside a body that time this error shows.
        return res.status(400).send({status: false, msg: "please provide name."})
    }
    
    if(!mobile) {
        return res.status(400).send({status: false, msg: "please provide phone number"})
    }
    if (!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(mobile)) {      //Regex for testing mobile number
        return  res.status(400).send({ status: false, msg: "It's not a valid mobile number" })
    }

    if(!emailId) {
        return res.status(400).send({status: false, msg: "please provide email"})
    }

    if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(emailId))) {                                 //Regex for testing email ID
       return res.status(400).send({ status: false, msg: "Please provide correct email formate" })
    }

    if (!password) {
        return res.status(400).send({ status: false, msg: "Please provide password" })
    }

    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/.test(password)) {                       //Regex for testing password
        return res.status(400).send({ status: false, msg: "please provide valid password" })
    }
let saveData= await userModel.create(data)                                                              // Registering the user.
    res.status(201).send({status:true, msg:"successfully created", data:saveData }) 
} catch(err) {
    console.log(err)
    res.status(500).send({status:false, msg: err.message})
}

}



const loginUser = async function (req, res) {
    try {
    let body = req.body
    if (Object.keys(body) != 0) {                                          // checking if the req body is empty or not.
    let userName = req.body.email;
    let passwords = req.body.password; 
    if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(passwords))) {                    //Regex for testing password.
    return res.status(400).send({ status: false, msg: "please provide valid password with one uppercase letter ,one lowercase, one character and one number " })
    }
    let user = await userModel.findOne({ email: userName});

    if (!user) {
    return res.status(400).send({
    status: false,msg: "email is not correct" });
    }

    if (user.password != passwords) {                                        //checking the password if it is correct or not.
        return res.status(400).send({status: false, msg: "password is not correct"})
    }
    
    let token = jwt.sign(                                                  // creating jwt token.
    {
     userId: user._id,
    email: user._email,
     iat: Math.floor(Date.now() / 1000), //issue date
    exp: Math.floor(Date.now() / 1000) + 60*60 //expiry date
    
    }, "Groupproject"                                                       // secretkey
    
    );
    res.status(200).setHeader("x-api-key", token);                         // setting the token in response header.
    return res.status(201).send({ status: "loggedin", token: token });
    }
    
    else { return res.status(400).send({ msg: "Bad Request" }) }
    
    }
    catch (err) {
    
    return res.status(500).send({ msg: err.message })
    }
    
    };

    // exporting all the modules.
 module.exports.createUser=createUser;
 module.exports.loginUser=loginUser;
