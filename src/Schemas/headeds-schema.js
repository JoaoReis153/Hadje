const mongoose = require('mongoose');

const headedsSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    userlId : {
        type: String,
        required: true,
    },

    phrases :  {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('headeds', headedsSchema)