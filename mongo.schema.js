const mongo = require('./config.mongo'); 
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true},
    age: { type: Number, required: true },
}, {
    timestamps: true,
});
module.exports = mongoose.model('User', userSchema);