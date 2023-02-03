/** @format */
console.clear();
const Client = require("./Structures/Client.js");
const config = require("./Data/config.json");
const client = new Client();
const mongo = require('./Database/index.js')
const commandBase = require('./Commands/base.js')

client.on ('ready', async () => {

    await mongo().then(mongoose => {
        try {
            console.log('(Mongo) - Connected')
            console.log('----------------------------')
            console.log('----------------------------')
        } finally {
            mongoose.connection.close()
        }
    })
    
    commandBase.loadPrefixes(client)

})

client.start(config.token);
