var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

let usersRouter = require('./routes/users');

let app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  };
  next();
});

app.use('/users', usersRouter);

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
