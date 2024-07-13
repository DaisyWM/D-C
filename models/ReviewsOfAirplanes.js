const mongoose = require('mongoose');

const reviewAirplaneSchema = new mongoose.Schema({
  airline: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Airline' },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  rating: { type: Number,  min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
}, 
{ timestamps: true });

const ReviewAirplaneModel = mongoose.model('ReviewAirplane', reviewAirplaneSchema);

module.exports = ReviewAirplaneModel;
