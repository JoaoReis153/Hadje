/** @format */

const Command = require("../../../Structures/Command.js");

const  { syntaxResponse } = require('../../../Util/Embeds/setchannel')

const config = require('../../../Data/config.json')

const prefixSchema = require('../../../Schemas/prefix-schema')

const mongo = require('../../../Database/index')

const setchannel_message = require('../../../Schemas/setchannel_message')

module.exports = new Command({
	name: "setchannel",
	aliases: ['channel'],
	description: "Hello!",
	permission: "MANAGE_ROLES",
	botpermission: "MANAGE_ROLES",
	async run(message, args, client) {
		const channelId = args[1].replace('<#', '').replace('>', '')

        if (!channelId || channelId === undefined) {
            await mongo().then(async (mongoose) => {
                try {
                    const data = await prefixSchema.findOne({ _id : message.guild.id})
                    if (!data) {
                        prefix = config.prefix
                    } else {
                        prefix = data.prefix
                    }		
                } finally {
                    mongoose.connection.close()
                }    
            })
            console.log(prefix)
			return message.channel.send({embeds:[syntaxResponse(prefix)]});

        }

        console.log(channelId)

        await mongo().then(async (mongoose) => {
            try {
                await setchannel_message.findOneAndUpdate(
                    { 
                    _id : message.guild.id,
                    channelId : channelId
                    },
                    {
                    _id : message.guild.id,
                    channelId: channelId
                    },
                    {
                        upsert: true,
                    } 
                )
            } finally {
                mongoose.connection.close()
            }    
        })
	}

});