const mongoose = require('mongoose');
const LabItem = require('./Schemas/lab-item.js');

const Lab = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    location: {
        type: String,
        required: true,
        maxlength: 50
    },
    inventory: {
        type: [LabItem],
        required: true,
        default: {}
    },
});

module.exports = mongoose.model('Lab', Lab);