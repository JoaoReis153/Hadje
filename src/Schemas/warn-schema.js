const mongoose = require('mongoose');

const warnSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true,
    },

    warnings: {
        type: [Object],
        required: true
    }
})

module.exports = mongoose.model('warnings', warnSchema)