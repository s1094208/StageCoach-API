var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
require('dotenv').config();
const cors = require('./middleware/cors.middleware');
var apiRouter = express.Router();

let usersRouter = require('./routes/user.routes');

let app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle CORS
app.use(cors);

app.use('/api', apiRouter);

apiRouter.use('/users', usersRouter);

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not Found!');
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || 'Internal Server Error!'
    }
  });
});

module.exports = app;
