require("dotenv").config();
const config = {
    appPort : process.env.SERVER_APP_PORT,
    dbURI : process.env.MONGO_URI,
    secretKey: process.env.SECRET_KEY,
    refreshKey : process.env.REFRESH_KEY
}
module.exports={config}