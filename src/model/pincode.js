const mongoose = require('mongoose');

const nationalDetailSchema = mongoose.Schema({
    country: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    pinCode: {
        type: String,
        trim: true,
        require: true,
    }
});

exports.NationalDetail = mongoose.model('NationalDetail', nationalDetailSchema);