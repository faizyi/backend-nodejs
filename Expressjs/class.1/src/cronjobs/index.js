const job1 = require("./job1");
const job2 = require("./job2");

const cronManager = new Map();
cronManager.set("job1", job1)
cronManager.set("job2", job2);
module.exports = cronManager