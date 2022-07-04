const mongoose = require('mongoose');
const Item = require('./item.js');

const OnLoan = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ['reserved', 'deployed', 'overdue', 'damaged'],
        required: true
    },
    dateBorrowed:{
        type: Date,
        default: Date.now,
        required: false,
    },
    dateReturned:{
        type: Date,
        required: false,
    },
});

module.exports =  OnLoan;