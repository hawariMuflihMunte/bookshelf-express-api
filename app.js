/* eslint-disable linebreak-style */
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use((request, response, callback) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', '*');

  if (request.method === 'OPTIONS') {
    response.header('Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, PUT');
    return response.status(200).json({});
  }

  callback();
});

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((request, response, callback) => {
  const error = new Error('Not found');
  error.status = 404;
  callback(error);
});

app.use((error, request, response, callback) => {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
