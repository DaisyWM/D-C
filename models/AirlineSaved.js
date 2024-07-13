const mongoose = require('mongoose');

const savedAirlineSchema = new mongoose.Schema({
    airline: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Airline'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'}, 
    saved: {type: Boolean, default: true},
});

const SavedAirlineModel = mongoose.model('SavedAirline', savedAirlineSchema);

module.exports = SavedAirlineModel;