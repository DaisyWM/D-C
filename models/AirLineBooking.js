const mongoose = require('mongoose');

const AirlineBookingSchema = new mongoose.Schema({
    airline: {type:mongoose.Schema.Types.ObjectId, ref:'Airline'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkIn: {type:Date, required:true},
    returnDate: Date,  
    name: {type:String, required:true},
    phone: {type:String, required:true},
    email: String,
    price: Number,
    passangers: Number,
},
{ timestamps: true });

const AirlineBookingModel = mongoose.model('AirlineBooking', AirlineBookingSchema);

module.exports = AirlineBookingModel;