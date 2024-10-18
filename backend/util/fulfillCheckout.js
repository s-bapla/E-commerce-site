const stripe = require('stripe')(process.env.STRIPE_SECRET);
const CheckoutSession = require('../models/checkoutSession');
const Order = require('../models/order');

const handlePaymentFail = async (orderId, paymentIntentId) => {
  console.log('Handling failed payment for Payment Intent: ' + paymentIntentId);
  try {
    // Retrieve the Payment Intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log('Payment Intent:', paymentIntent);

    // Find the corresponding order in the database using the paymentIntentId
    const order = await Order.findById(orderId);
    if (!order) {
      console.error(`Order not found for paymentIntentId: ${paymentIntentId}`);
      return;
    }

    // Update the order status to 'failed'
    order.paymentStatus = 'failed';
    await order.save();

    console.log(`Order ${order._id} marked as failed.`);
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
};
// Define an async function to fulfill a checkout session given a sessionId
async function fulfillCheckout(sessionId) {
  console.log('Fulfilling Checkout Session ' + sessionId);

  try {
    // Retrieve the Checkout Session from Stripe's API with line_items expanded
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
    // Check the Checkout Session's payment_status to determine if fulfillment should be performed
    if (checkoutSession.payment_status === 'paid') {
      // Check if the session has already been fulfilled
      const isAlreadyFulfilled = await checkIfAlreadyFulfilled(sessionId);
      if (isAlreadyFulfilled) {
        console.log('Checkout session already fulfilled: ' + sessionId);
        return;
      }

      // Find the corresponding order in the database using sessionId
      const order = await Order.findOne({ sessionId });
      if (!order) {
        console.error(`Order not found for sessionId: ${sessionId}`);
        return;
      }

      // Iterate through line items and perform the necessary fulfillment actions
      const lineItems = checkoutSession.line_items.data;
      for (const item of lineItems) {
        await fulfillLineItem(item, order); // Pass the order to the fulfillment function
      }

      // Mark the session and order as fulfilled in your database
      await recordFulfillment(sessionId, order);

      console.log('Fulfillment completed for Checkout Session: ' + sessionId);
    } else {
      console.log(
        'Payment not completed, skipping fulfillment for session: ' + sessionId
      );
    }
  } catch (error) {
    console.error('Error fulfilling checkout session: ' + sessionId, error);
  }
}

// Function to check if a session has already been fulfilled
async function checkIfAlreadyFulfilled(sessionId) {
  try {
    const session = await CheckoutSession.findOne({ sessionId });
    if (!session) {
      console.error(`Checkout session not found: ${sessionId}`);
      return false;
    }
    return session.isFulfilled;
  } catch (error) {
    console.error(
      `Error checking fulfillment for session ${sessionId}:`,
      error
    );
    return false;
  }
}

// Function to fulfill a line item
async function fulfillLineItem(item, order) {
  try {
    // You can add logic here to update order details, reduce inventory, or trigger any external services
  } catch (error) {
    console.error(`Error fulfilling item ${item.id}:`, error);
  }
}

// Function to record fulfillment status for a session and update the order in the database
async function recordFulfillment(sessionId, order) {
  try {
    // Mark the Stripe checkout session as fulfilled
    const session = await CheckoutSession.findOneAndUpdate(
      { sessionId },
      {
        isFulfilled: true,
        fulfillmentDate: new Date(),
        updatedAt: new Date(),
        paymentStatus: 'paid',
      },
      { new: true }
    );

    if (session) {
      console.log(`Fulfillment recorded for session: ${sessionId}`);
    } else {
      console.error(`Checkout session not found: ${sessionId}`);
    }

    // Mark the order as fulfilled
    order.isFulfilled = true;
    order.paymentStatus = 'paid';
    order.fulfillmentDate = new Date();
    await order.save();

    console.log(`Order ${order._id} marked as fulfilled.`);
  } catch (error) {
    console.error(
      `Error recording fulfillment for session ${sessionId}:`,
      error
    );
  }
}

module.exports = { fulfillCheckout, handlePaymentFail };
