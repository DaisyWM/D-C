const mongoose = require('mongoose');

const reviewHotelSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  rating: { type: Number,  min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
}, 
{ timestamps: true });

const ReviewHotelModel = mongoose.model('ReviewHotel', reviewHotelSchema);

module.exports = ReviewHotelModel;
