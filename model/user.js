const mongoose = require('mongoose');
const CartItem = require('./Schemas/cart-item');
const OnLoan = require('./Schemas/on-loan');
const Fine = require('./Schemas/fine');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 128
    },
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    type: {
        type: String,
        required: true,
        enum: ['admin', 'student'],
        default: 'Student'
    },
    cart:{
        type: [CartItem],
        required: false,
    },
    loans:{
        type: [OnLoan],
        required: false,
    },
    fines:{
        type: [Fine],
        required: false,
    }
});

module.exports = mongoose.model('User', User);