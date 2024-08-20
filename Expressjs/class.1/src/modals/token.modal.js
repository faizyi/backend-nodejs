const mongoose = require('mongoose')

const { Schema } = mongoose

const TokenSchema = new Schema({
    accessToken : {
        type: String,
        required: true
    },
    refreshToken : {
        type: String,
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    }
}, {timestamps : true})


const TokenModel = mongoose.model('Token', TokenSchema)

module.exports = TokenModel