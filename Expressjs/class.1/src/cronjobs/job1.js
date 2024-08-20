const cron = require('node-cron');

const job1 = cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
module.exports = job1