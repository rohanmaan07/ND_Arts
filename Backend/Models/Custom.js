const mongoose = require('mongoose');

const customOrderSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String, required: true },

  material: { type: String, required: true },
  colour: { type: String, required: true },
  size: { type: String, required: true },
  dressType: { type: String, required: true },

  photos: [{ type: String }], // Array of photo URLs (stored files)

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional user ref
isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CustomOrder', customOrderSchema);
