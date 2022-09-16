    /** @format */

const Command = require("../../Structures/command.js");

const enabledm = require('../../Schemas/enabledisabledm')

const mongo = require('../../Database/index');

module.exports = new Command({
    name: "enabledm",
    description: "YOHOHO",
    permission: "SEND_MESSAGES",
    botpermission: "ADD_REACTIONS",
    async run(message, args, client) {

        await mongo().then(async (mongoose) => {
            try {
                const data = await enabledm.find({ guildId : message.guild.id })

                if (!data || data[0] === undefined){
                    await enabledm.insertMany([ {guildId: message.guild.id, users: [message.author.id] }])
                    return message.react('✅')
                }

                for (const obj of data) {
             
                    if (obj.users.includes(message.author.id)) {
                        return message.react('✅')
                    } else {
                        await enabledm.updateOne({ guildId : message.guild.id}, {$push: {users: message.author.id}})
                        return message.react('✅')
                    }
                }
                
                    

            }  catch(e) {
                console.log(e)
            }finally {
                mongoose.connection.close()
            }
        })
      
    }
})
