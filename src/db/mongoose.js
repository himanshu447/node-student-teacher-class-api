const mongoose = require('mongoose');


// mongoose.connect(process.env.MONGODB_URL, async (val) => {
//     console.log('Mongo Db Connected');
// });


mongoose.connect(`${process.env.MONGODB_URL}`);

///return connection object because need for create  transaction
const conn = mongoose.connection;
conn.on('error', () => console.error.bind(console, 'connection error'));
conn.once('open', () => console.info('Connection to Database is successful'));

module.exports = conn;