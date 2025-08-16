const express=require("express");
const router=express.Router();
const authController=require("../Controllers/Auth");


router.post("/signup",authController.register);
router.post("/signin",authController.login);
router.post("/google", authController.googleLogin);


module.exports=router;