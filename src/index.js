const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const classRouter = require('./routers/class');

const app = express();


app.use(express.json());
app.use(userRouter);
app.use(classRouter);


app.listen(process.env.PORT, () => {
    console.log('Server Start on', process.env.PORT);
});