
const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  shares: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Investment', investmentSchema);
