const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const mongoose = require('mongoose');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tinyUrlRouter = require('./routes/tinyUrl');
const authRouter = require('./routes/auth');
const errorHandler = require('./middleware/ErrorHandler');
var options = {
    explorer: true
  };

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  const db = mongoose.connection;
  db.on('error', () => console.log('MongoDB connection error:'));
  db.once('open', () => console.log('MongoDB connected!'));
  




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
app.use('/auth', authRouter);

app.all('*', (req, res) => {
  res.send('404').send('Page not found');
});

app.use(errorHandler);

module.exports = app;
