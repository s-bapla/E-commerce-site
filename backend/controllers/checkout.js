const stripe = require('stripe')(process.env.STRIPE_SECRET);
const express = require('express');
const jwt = require('jsonwebtoken');

const Cart = require('../models/cart');
const Order = require('../models/order');
const checkoutSession = require('../models/checkoutSession');

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

const YOUR_DOMAIN = 'https://e-commerce-site.fly.dev/';

router.post('/create-checkout-session', authMiddleWare, async (req, res) => {
  const userId = req.user.id;

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId }).populate(
      'products.product'
    );
    if (!cart || cart.products.length === 0) {
      console.error('Cart is empty for user:', userId);
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Map cart products to Stripe line_items
    const lineItems = cart.products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.product.title,
        },
        unit_amount: product.product.price * 100, // Price in cents
      },
      quantity: product.quantity,
    }));

    // Find an existing order for the user that is in 'pending' state
    const order = await Order.findOne({
      user: userId,
      paymentStatus: 'pending',
    }).sort({ createdAt: -1 });
    if (!order) {
      console.error('Pending order not found for user:', userId);
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create the Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}success`,
      cancel_url: `${YOUR_DOMAIN}cancelled`,
      expand: ['payment_intent'],
      payment_intent_data: {
        metadata: {
          orderId: order._id.toString(), // Add order ID to payment intent metadata
          userId: userId, // Optionally add more metadata if needed
        },
      },
    });

    // Log session creation for debugging
    console.log('Stripe session created:', session.id);

    // Create new CheckoutSession in MongoDB
    const newCheckoutSession = new checkoutSession({
      sessionId: session.id, // Save the Stripe session ID
      paymentStatus: 'unpaid', // Stripe will update this later
      lineItems: lineItems,
      isFulfilled: false, // Default value until fulfillment
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newCheckoutSession.save(); // Save the session in MongoDB

    // Attach sessionId to the order and save the order
    order.sessionId = session.id;
    await order.save();

    // Return the session URL to the client
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Error during checkout session creation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
