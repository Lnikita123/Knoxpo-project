const express=require('express')
const router = express.Router()                                                    


const UserController= require("../controllers/userController")                          // Requiring all the controllers.
const contactGroupController= require("../controllers/contactGroupController")
const contactController = require("../controllers/contactController")
const Logincheck = require("../middleware/authorization")
//****************************************************User API **********************************************//

router.post("/register",UserController.createUser)
router.post("/login", UserController.loginUser)

//***************************************Contact Group APIS**********************************************//

router.post("/create", Logincheck.loginCheck, contactGroupController.createGroup)
router.get("/getdata",Logincheck.loginCheck,contactGroupController.getContactGroup)
router.get("/getAllGroup",Logincheck.loginCheck,contactGroupController.getallGroupOfUser)
router.put("/updateGroup/:groupById",Logincheck.loginCheck, contactGroupController.updateGroup)
router.delete("/deleteGroup",Logincheck.loginCheck, contactGroupController.deletegroup)


//**********************************************Contact APIs **********************************************//

router.post("/createContact",Logincheck.loginCheck,contactController.createContact)
router.get("/getContact",Logincheck.loginCheck,contactController.getContact)
router.get("/getParticularContact",Logincheck.loginCheck,contactController.getParticularContact)
router.put("/updateContact/:contactById",Logincheck.loginCheck, contactController.updateContact)
router.delete("/deleteContact",Logincheck.loginCheck ,contactController.deleteContact)
module.exports= router;