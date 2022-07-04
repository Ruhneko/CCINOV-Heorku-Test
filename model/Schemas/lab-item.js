const mongoose = require('mongoose');
const Item = require('./item.js');

const LabItem = new mongoose.Schema({
    _id: Number, 
    item: {
        type: Item,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Number,
        required: true,
        min: 0
    },
    loaned: {
        type: Number,
        required: true,
        min: 0
    },
});

module.exports =  LabItem;