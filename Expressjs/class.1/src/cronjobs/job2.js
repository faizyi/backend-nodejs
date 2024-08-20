const cron = require('node-cron');

const job2 = cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
module.exports = job2