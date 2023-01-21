/* eslint-disable linebreak-style */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (request, response, callback) => {
  response.status(200).json({
    message: 'Handling GET requests to /products',
  });
});

router.post('/', (request, response, callback) => {
  const product = {
    name: request.body.name,
    price: request.body.price,
  };

  response.status(201).json({
    message: 'Handling POST requests to /products',
    createdProduct: product,
  });
});

router.get('/:productId', (request, response, callback) => {
  const id = request.params.productId;

  if (id === 'special') {
    response.status(200).json({
      message: 'You discovered the special ID',
      id: id,
    });
  } else {
    response.status(200).json({
      message: 'You passed an ID',
    });
  }
});

router.patch('/:productId', (request, response, callback) => {
  response.status(200).json({
    message: 'Updated product!',
  });
});

router.delete('/:productId', (request, response, callback) => {
  response.status(200).json({
    message: 'Deleted product!',
  });
});

module.exports = router;
