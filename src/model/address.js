const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    street1: {
        type: String,
        trim: true,
    },
    street2: {
        type: String,
        trim: true,
    },
    landMark: {
        type: String,
        trim: true,
    }
});

exports.Address = mongoose.model('Address', addressSchema);