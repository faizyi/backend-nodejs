const mongoose = require('mongoose');
const UserModel = require('./user.modal');
const TokenModel = require('./token.modal');
const db = {};
db.mongoose = mongoose;
db.user = UserModel;
db.token = TokenModel;
module.exports =  db
