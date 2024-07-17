
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  sharesAvailable: { type: Number, required: true },
  dividends: { type: Number, required: true }
});

module.exports = mongoose.model('Property', propertySchema);
