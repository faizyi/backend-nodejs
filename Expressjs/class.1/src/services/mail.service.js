const nodemailer = require('nodemailer');

const transpoter = nodemailer.createTransport({
    service : "Gmail",
    host : "smtp.gmail.com",
    port : 587,
    secure : true,
    auth : {
        user : "faiznoor492@gmail.com",
        pass : "gjld pinq glny bfks"
    }
})


const sendEmail = async (data)=>{
    try {
        const response = transpoter.sendMail({
            from : "faiznoor492@gmail.com",
            ...data
        })
        return response
    } catch (error) {
        throw error
    }

}

module.exports={sendEmail}