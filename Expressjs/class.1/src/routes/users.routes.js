const express = require("express");
const { signup, login, logout, verifyOtp, profile } = require("../controlers/user.controlers");
const { signupRouteValidator } = require("../validators/request.valid");
const { checkAuth } = require("../middlewares/check-auth.middleware");
const { updateUser } = require("../controlers/user.update.controler");
const route = express.Router();
route.post("/signup",signupRouteValidator, signup)
route.post("/verify-otp",verifyOtp)
route.post("/login",login)
route.post("/logout",logout)
route.post("/profile", checkAuth ,profile);
route.put("/update", checkAuth, updateUser)
module.exports={route}