const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const redisClient = require("redis").createClient();


require('dotenv').config()



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tinyUrlRouter = require('./routes/tinyUrl');
var options = {
    explorer: true
  };

/*  redisClient.connect()
.then(() => {
    console.log('Redis connected');
});
 */


const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tinyurl', tinyUrlRouter);

module.exports = app;
