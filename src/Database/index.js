const mongoose = require('mongoose')

const config = require("../Data/config.json");

module.exports = async () => {
    try {
        await mongoose.connect(config.mongoPath, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch(err) {
        console.log(err)
    }
    
    return mongoose
}