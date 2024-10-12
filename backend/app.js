const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./util/config');
const cors = require('cors')
require('express-async-errors');
const { errorHandler } = require('./util/middleware')
const productRouter = require('./conrollers/products')
const userRouter = require('./conrollers/users');
const loginRouter = require('./conrollers/login');

mongoose.connect(MONGODB_URI).then(() => {
  console.log('started mongo.');
});

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
app.use(errorHandler);


module.exports = app;
