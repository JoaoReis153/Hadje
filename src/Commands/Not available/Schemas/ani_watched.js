const mongoose = require('mongoose');

const ani_watched = new mongoose.Schema({
    userId : {
        type: String,
        required : true
    },
    anilist_username : {
        type: String,
        required : true
    },

    animes : {
        type: [String],
        require: true
    }
    
})


module.exports = mongoose.model('ani_watched', ani_watched)