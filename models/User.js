const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: {type: String, required:true,  unique: true},  
    password: String,
    admin: {type: Boolean, default: false},
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;