/* eslint-disable linebreak-style */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (request, response, callback) => {
  response.status(200).json({
    message: 'Orders were fetched',
  });
});

router.post('/', (request, response, callback) => {
  const order = {
    productId: request.body.productId,
    quantity: request.body.quantity,
  };

  response.status(201).json({
    message: 'Order was created',
    order: order,
  });
});

router.delete('/', (request, response, callback) => {
  response.status(200).json({
    message: 'Orders deleted',
    orderId: request.params.orderId,
  });
});

module.exports = router;
