const User = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const Cart = require('../models/cart');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('products');
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const users = await User.findById(id).populate('products');
  res.json(users);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const passwordHash = await bcrypt.hash(body.password, 10);

  const newUser = new User({
    username: body.username,
    name: body.name,
    password: passwordHash,
  });

  const result = await newUser.save();
  const cart = new Cart({ products: [], user: result._id });
  result.cart = cart;
  await cart.save();
  await result.save();
  const userForToken = {
    username: result.username,
    id: result._id,
    role: result.role,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res
    .status(201)
    .send({
      token,
      username: result.username,
      id: result.id,
      role: result.role,
    });
});

module.exports = router;
