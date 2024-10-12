const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Product = require('../models/product');

const router = express.Router();

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json(product);
});

router.post('/', async (request, response) => {
  const decodedUserToken = jwt.verify(
    getTokenFrom(request),
    process.env.SECRET
  );
  if (!decodedUserToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedUserToken.id);
  const { title, description, imageUrl, price } = request.body;
  const product = new Product({ title, description, imageUrl, price, user: user.id });
  const result = await product.save();
  response.status(201).json(result);
});

module.exports = router;
