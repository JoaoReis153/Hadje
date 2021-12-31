const mongoose = require('mongoose');

const setchannel_message = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    channelId: {
        type: String,
        required: true,
    },

    messageId: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('setchannel/message', setchannel_message)