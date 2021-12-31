const mongoose = require('mongoose');

const enabledm = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    users : {
        type: [String],
        require: true
    }
    
})


module.exports = mongoose.model('enable/disabledm', enabledm)