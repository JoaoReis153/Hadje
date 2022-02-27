const mongoose = require('mongoose');

const customEmbed = new mongoose.Schema({
    customname: {
        type: String,
        required: true
    },

    images: {
        type: [Object],
        required: false
    }
    
})

module.exports = mongoose.model('customEmbeds', customEmbed)