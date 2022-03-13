const mongoose = require('mongoose');

const customEmbed = new mongoose.Schema({
    customname: {
        type: String,
        required: true
    },

    alias: {
        type: String,
        required: true
    },

    images: {
        type: [Object],
        required: false
    },

    color: {
        type: String,
        require: false
    }
    
})

module.exports = mongoose.model('customEmbeds', customEmbed)