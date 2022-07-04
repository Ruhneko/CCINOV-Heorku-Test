const mongoose = require('mongoose');
const Item = require('./item.js');

const CartItem = new mongoose.Schema({
    _id: Number, 
    item: {
        type: Item,
        required: true,
    },
    labName: {
        type: String,
        required: true,
        maxlength: 50
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
});

module.exports = CartItem;