const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, ref:'Place'},
    airline: {type:mongoose.Schema.Types.ObjectId, ref:'Airline'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkIn: {type:Date, required:true},
    checkOut: Date,  
    name: {type:String, required:true},
    phone: {type:String, required:true},
    email: String,
    price: Number,
},
{ timestamps: true });

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;