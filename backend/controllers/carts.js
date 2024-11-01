const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Cart = require('../models/cart');

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

const router = express.Router();

router.get('/', authMiddleWare, async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  await user.populate({
    path: 'cart',
    populate: {
      path: 'products.product', // This populates the 'product' field in the 'products' array
      model: 'Product', // The Product model to populate from
    },
  });
  res.json(user.cart.products);
});

router.post('/', authMiddleWare, async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  const cartId = user.cart;
  const cart = await Cart.findById(cartId);
  const index = cart.products.findIndex(
    (product) => product.product.toString() === req.body.product.toString()
  );
  if (index !== -1) {
    cart.products[index].quantity += 1;
    const newCart = await cart.save();
    await newCart.populate('products.product');
    return res.status(201).json(newCart.products);
  }
  cart.products.push({
    product: req.body.product,
    quantity: req.body.quantity,
  });
  const newCart = await cart.save();
  await newCart.populate('products.product');
  res.status(201).json(newCart.products);
});

router.put('/', authMiddleWare, async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  const cartId = user.cart;
  const cart = await Cart.findById(cartId);
  const prodId = req.body.product;
  const index = cart.products.findIndex((product) => {
    return product.product.toString() === prodId;
  });

  if (req.body.quantity > 0) {
    cart.products[index].quantity = req.body.quantity;
  } else {
    cart.products = cart.products.filter(
      (product) => prodId !== product.product.toString()
    );
  }

  const newCart = await cart.save();
  await newCart.populate('products.product');
  res.json(newCart.products);
});

router.delete('/:productId', authMiddleWare, async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const updatedProducts = cart.products.filter(
    (item) => item.product.toString() !== productId
  );

  if (updatedProducts.length === cart.products.length) {
    return res.status(404).json({ error: 'Product not found in cart' });
  }

  cart.products = updatedProducts;
  await cart.save();

  res.status(200).json(cart);
});

module.exports = router;
