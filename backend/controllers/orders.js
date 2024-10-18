const express = require('express');
const jwt = require('jsonwebtoken');

const Order = require('../models/order');
const Cart = require('../models/cart');
const User = require('../models/user');

const router = express.Router();

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

const authMiddleWare = (request, response, next) => {
  const decodedUserToken = jwt.verify(
    getTokenFrom(request),
    process.env.SECRET
  );
  if (!decodedUserToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  request.user = { id: decodedUserToken.id, role: decodedUserToken.role };
  next();
};

router.get('/', authMiddleWare, async (req, res) => {
  const id = req.user.id;
  const orders = await Order.find({ user: id });
  res.json(orders);
});

router.post('/', authMiddleWare, async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  const cartId = user.cart;
  const cart = await Cart.findById(cartId).populate('products.product');
  const order = new Order({ products: cart.products, user: cart.user });
  const result = await order.save();
  res.status(201).json(result); // {products: [], user: id}
});

module.exports = router;
