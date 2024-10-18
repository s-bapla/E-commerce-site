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

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
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

router.post('/', authMiddleWare, adminMiddleware, async (request, response) => {
  const user = await User.findById(request.user.id);
  const { title, description, imageUrl, price } = request.body;
  const product = new Product({
    title,
    description,
    imageUrl,
    price,
    user: user.id,
  });
  const result = await product.save();
  user.products.push(result);
  await user.save();
  response.status(201).json(result);
});

router.put(
  '/:id',
  authMiddleWare,
  adminMiddleware,
  async (request, response) => {
    const id = request.params.id;
    const { title, description, imageUrl, price } = request.body;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        imageUrl,
        price,
        user: request.user.id,
      },
      { new: true }
    );
    response.status(201).json(product);
  }
);

router.delete(
  '/:id',
  authMiddleWare,
  adminMiddleware,
  async (request, response) => {
    const id = request.params.id;

    await Product.findByIdAndDelete(id);
    response.status(204).end();
  }
);

module.exports = router;
