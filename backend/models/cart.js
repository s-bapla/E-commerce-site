const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

cartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Cart', cartSchema);