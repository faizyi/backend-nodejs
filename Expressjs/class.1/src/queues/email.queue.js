const Queue = require("bull");
const  redisConfig  = require("../configs/redis.config.js");
const { sendEmail } = require("../services/mail.service");
//Queue setup
const emailQueue = new Queue("email queue", {
    redis : { ...redisConfig }
});

emailQueue.process((payload,done)=>{
    try {
        const {data} = payload;
        payload.progress(5)
        payload.log('initializing email setup')
        sendEmail(data)
            .then(res => {
                payload.log('succesfully send the email')
                payload.progress(100)
                done()
            })
            .catch(err => {
                payload.log('error sending email')
                payload.progress(100)
                done(new Error('Error processing queue task'))
            })
    } catch (error) {
        console.log("Error", error)
    }
})

module.exports = emailQueue
