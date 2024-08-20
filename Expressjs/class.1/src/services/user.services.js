const jwt = require('jsonwebtoken');
const { config } = require("../configs/server.config.js");
const db = require("../modals/db.js");
const {user : User, token : Token } = db

const findByEmail = async (email)=>{
    try {
        const user = await User.findOne({email : email});
        return user
    } catch (error) {
        throw error
    }
}
const findById = async (id)=>{
    try {
        const user = await User.findById(id);
        return user
    } catch (error) {
        throw error
    }
}
const createUser = async (payload) => {
    try {
        const user = new User({ ...payload });
        const result = await user.save();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};



const UpdateUserByEmail = async (email)=>{
    try {
        const response = await User.updateOne(
            {email : email},
            {isActive : true}
        )
        return response
    } catch (error) {
        throw error
    }
}

const getTokenByUID = async (uid)=>{
    try {
        const response = await Token.find({ user: uid });
        return response
    } catch (error) {
        throw error
    }
}

const jwtToken = async (user) => {
    try {
        const accessToken = jwt.sign({email : user.email, username: user.username}, config.secretKey, 
        { expiresIn: '1d' });
        const refreshToken = jwt.sign({email : user.email, username: user.username}, config.refreshKey, 
        { expiresIn: '7d' });
        const token = new Token({ accessToken, refreshToken, user: user.id });
        await token.save();
        return {accessToken, refreshToken}
    } catch (error) {
        throw error
    }
}

// const generateRefreshToken = async (user) => {
//     try {
//         const accessToken = jwt.sign({email : user.email, username: user.username}, config.secretKey, 
//         { expiresIn: '1m' });

//         const token = new Token({ accessToken : accessToken, refreshToken : refreshToken, user: user.id });
//         await token.save()
//         return {accessToken, refreshToken}
//     } catch (error) {
//         throw error
//     }
// }


const deleteTokensByUID = async (uid) => {
    try {
        const response = await Token.deleteMany({ user: uid })
        return response
    } catch (error) {
        throw error
    }
}

module.exports = { createUser, findByEmail, jwtToken, getTokenByUID, 
deleteTokensByUID, UpdateUserByEmail, findById }