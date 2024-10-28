const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./util/config');
const cors = require('cors');
require('express-async-errors');
const { errorHandler } = require('./util/middleware');
const productRouter = require('./controllers/products');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const cartRouter = require('./controllers/carts');
const orderRouter = require('./controllers/orders');
const checkoutRouter = require('./controllers/checkout');
const { handlePaymentFail } = require('./util/fulfillCheckout');
const Order = require('./models/order');

mongoose.connect(MONGODB_URI).then(() => {
  console.log('started mongo.');
});

const app = express();

app.use(cors());
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { fulfillCheckout } = require('./util/fulfillCheckout');
const endpointSecret = process.env.ENDPOINT;
app.use(express.static('dist'));
app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (request, response) => {
    console.log('Webhook received');

    const sig = request.headers['stripe-signature'];
    let event;

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log('Constructed event');
    } catch (err) {
      console.error('Error verifying webhook signature:', err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event types
    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      console.log('Fulfilling order for event:', event.type);
      try {
        await fulfillCheckout(event.data.object.id); // Use the session ID
        console.log('Order fulfilled');
      } catch (err) {
        console.error('Error fulfilling order:', err.message);
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      // Handle failed payment intents
      try {
        const paymentIntent = event.data.object;

        // Get orderId from the payment intent metadata
        const orderId = paymentIntent.metadata.orderId;
        console.log('themeta', event.data.object.metadata);
        await handlePaymentFail(orderId, event.data.object.id); // Use the payment intent ID
        console.log('Payment failed');
      } catch (err) {
        console.error('Error handling payment failure:', err.message);
      }
    } else if (event.type === 'charge.failed') {
      // Handle failed charges by using the related payment intent
      const paymentIntent = event.data.object;
      const paymentIntentId = event.data.object.payment_intent;
      // Get orderId from the payment intent metadata
      const orderId = paymentIntent.metadata.orderId;
      if (paymentIntentId) {
        try {
          await handlePaymentFail(orderId, paymentIntentId); // Use the payment intent ID from the charge object
          console.log('Charge failed');
        } catch (err) {
          console.error('Error handling charge failure:', err.message);
        }
      } else {
        console.error('No associated payment intent for failed charge.');
      }
    } else if (event.type === 'checkout.session.expired') {
      // Handle expired checkout session
      const session = event.data.object;
      const orderId = session.metadata.orderId;

      if (orderId) {
        try {
          // Find the order in the database
          const order = await Order.findOne({ _id: orderId });

          if (!order) {
            console.error(`Order not found for expired session: ${orderId}`);
          } else {
            // Update the order status to reflect the session expiration
            order.paymentStatus = 'failed';
            await order.save();

            console.log(`Order ${orderId} marked as expired.`);
          }
        } catch (err) {
          console.error('Error handling expired session:', err.message);
        }
      } else {
        console.error('No associated order for expired session.');
      }
    } else {
      console.log('Unhandled event type:', event.type);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.status(200).send({ received: true });
  }
);

app.use(express.json());

app.use(checkoutRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
