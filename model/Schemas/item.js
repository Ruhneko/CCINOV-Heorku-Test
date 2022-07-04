const mongoose = require('mongoose');

const Item = new mongoose.Schema({
    _id: Number,   
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    image:{
        type: String,
        required: true,
        maxlength: 500
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    tags: {
        type: [],
        required: false
    },
});

module.exports =  Item;