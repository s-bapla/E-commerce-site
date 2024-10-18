const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      product: {
        title: { type: String, required: true },
        description: String,
        imageUrl: String,
        price: { type: Number, required: true },
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      },
      quantity: Number,
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
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
  sessionId: {
    type: String,
  },
  paymentIntentId: { type: String },
});

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Order', orderSchema);
