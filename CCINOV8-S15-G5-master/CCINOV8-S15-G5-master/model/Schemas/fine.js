const mongoose = require('mongoose');

const Fine = new mongoose.Schema({
    _id: Number, 
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
});

module.exports = Fine;