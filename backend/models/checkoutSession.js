const mongoose = require('mongoose');

const checkoutSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid', 'no_payment_required'],
    required: true,
  },
  lineItems: [
    {
      price_data: {
        currency: { type: String, required: true },
        product_data: {
          name: { type: String, required: true },
        },
        unit_amount: { type: Number, required: true }, // Price in cents
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  isFulfilled: {
    type: Boolean,
    default: false,
  },
  fulfillmentDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CheckoutSession', checkoutSessionSchema);
