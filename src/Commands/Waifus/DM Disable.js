    /** @format */

const Command = require("../../Structures/command.js");

const enabledm = require('../../Schemas/enabledisabledm')

const mongo = require('../../Database/index');

module.exports = new Command({
    name: "disabledm",
    description: "YOHOHO",
    permission: "SEND_MESSAGES",
    botpermission: "ADD_REACTIONS",
    async run(message, args, client) {

        await mongo().then(async (mongoose) => {
            try {
                const data = await enabledm.find({ guildId : message.guild.id })

                if (!data || data[0] === undefined){
                    return message.react('✅')
                }

                for (const obj of data) {

                    if (obj.users.includes(message.author.id)) {
                        await enabledm.updateMany({guildId : message.guild.id}, { $pull: { 'users' : message.author.id}})
                        return message.react('✅')
                    } else {
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
