const express = require('express');
const loginRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = { username: user.username, id: user.id, role: user.role };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(201).send({ token, username: user.username, id: user.id, role: user.role });
});

module.exports = loginRouter;
