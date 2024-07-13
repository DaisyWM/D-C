const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    contact: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    boarding: Number,
    passangers: Number,
    price: Number,
},
{ timestamps: true });

const AirlineModel = mongoose.model('Airline', airlineSchema);

module.exports = AirlineModel;