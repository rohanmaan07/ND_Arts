const express=require("express");
const router=express.Router();
const userController=require("../Controllers/UserC");
const authenticate = require("../Middleware/Authenticate.js");

router.get("/profile", authenticate ,userController.getUserProfile);
router.put("/profile",authenticate ,userController.updateUserProfile);
router.get("/",userController.getAllUsers);


module.exports=router;