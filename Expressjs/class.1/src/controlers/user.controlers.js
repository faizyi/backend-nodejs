const { query, validationResult } = require('express-validator');
const { hashPassword, comparePassword } = require("../utils/hash.password.js");
const { createUser, findByEmail, saveToken, jwtToken,
getTokenByUID, deleteTokensByUID, 
UpdateUserByEmail,
findById} = require("../services/user.services.js");
const { sendSuccessResponse, sendErrorResponse, sendServerErrorResponse } = require('../utils/responseUtil.js');
const signup = async (req,res)=>{
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
          }
        const {username,email,password} = req.body;
        const user = await findByEmail(email);
        if(user) return sendErrorResponse(res,'Signup failed',user)
        const hash = await hashPassword(password);
        const payload = {username,email,password:hash};
        const newUser = await createUser(payload);
        if(!newUser) throw new Error('Something went wrong');
        sendSuccessResponse(res,'Signup Successful', user)
        // res.cookie('email', "faiz");
        // res.status(200).json({ success: true, message: 'Signup Successful', data: null });
        // res.redirect('/user/login');
    } catch (error) {
        console.log(error);
        sendServerErrorResponse(res,'Something went wrong')
    }
}
const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await findByEmail(email);
        if(!user) return res.status(401).json({ success: false, message: 'Invalid credentials', data: null });
        if (!user.isActive) return res.status(403).json({ success: false, message: 'plz verify your account first', data: null });
        const isAlreadyLoggedin = await getTokenByUID(user._id);
        if (isAlreadyLoggedin?.length > 0) return res.status(403).json({ success: false, 
        message: 'already logged in', data: null })
        const matchPassword = await comparePassword(password, user.password);
        if(!matchPassword) return res.status(401).json({ success: false, message: 'Invalid credentials', data: null });
        const { accessToken, refreshToken } = await jwtToken(user);
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.status(200).json({ accessToken: accessToken, refreshToken : refreshToken, email : user.email, username : user.username, uid : user.id, message: 'Login Successful'  });    
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');  
    }
}

const logout = async (req,res)=>{
    try {
        const { userId } = req.body;
        const logoutUser = await deleteTokensByUID(userId); 
        if (logoutUser.deletedCount === 0) {
            return res.status(500).json({ success: false, message: 'Already logged out', data: null });
        }
        return res.status(200).json({ success: true, message: 'Successfully logged out', data: null });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
    }
}

const verifyOtp = async (req,res)=>{
    try {
        const {email, otp} = req.body;
        const user = await findByEmail(email);
        if(!user) return res.status(400).json({message: 'User not found! Please Signup'});
        if(user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
        if(user.isActive == true) return res.status(400).json({ message: 'Your otp is already verified! Please Login Your Account' });
        const response = await UpdateUserByEmail(user.email);
        return res.status(200).json({ success: true, message: "otp verified", data: null });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
    }

}

const profile = async (req,res)=>{
    try {
        const {uId} = req.body;
        const user = await findById(uId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: 'success', data: {name: user.username, email: user.email} })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'somthing went wrong', data: null })
    }
}
module.exports={login,signup,logout,verifyOtp,profile}