const cron = require('node-cron');
const { ClassServices } = require('../services/class_services');

endClassCorn = cron.schedule('*/5 * * * * *', () => {
    console.log('Running Task every 5 Second');
    ClassServices.endClass();
});

module.exports = endClassCorn;
