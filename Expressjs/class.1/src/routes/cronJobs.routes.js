const express = require("express");
const { startJob, stopJob } = require("../controlers/cron.controler");
const route = express.Router();
route.post('/start-job', startJob)
route.post('/stop-job', stopJob)
module.exports={route}