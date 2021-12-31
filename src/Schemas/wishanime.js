const mongoose = require('mongoose');

const wishanimeSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    anime : {
        type : String,
        require: true
    },
    users : {
        type: [String],
        require: true
    }
    
})


module.exports = mongoose.model('wishanime', wishanimeSchema)