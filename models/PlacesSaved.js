const mongoose = require('mongoose');

const savedPlaceSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'}, 
    saved: {type: Boolean, default: true},
});

const SavedPlaceModel = mongoose.model('SavedPlace', savedPlaceSchema);

module.exports = SavedPlaceModel;