/** @format */

const Command = require("../../../Structures/Command.js");

const  { syntaxResponse } = require('../../../Util/Embeds/setmessage')

const config = require('../../../Data/config.json')

const prefixSchema = require('../../../Schemas/prefix-schema')

const mongo = require('../../../Database/index')

const setchannel_message = require('../../../Schemas/setchannel_message');
const { set } = require("mongoose");

module.exports = new Command({
	name: "setmessage",
	aliases: ['message'],
	description: "Hello!",
	permission: "MANAGE_ROLES",
	botpermission: "MANAGE_ROLES",
	async run(message, args, client) {
		const messageId = args[1]

        if (!messageId || messageId === undefined) {
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

       

        await mongo().then(async (mongoose) => {
            try {
                const data = await setchannel_message.findOne({ _id : message.guild.id})
                const channel2 = client.channels.cache.get(data.channelId)
                const msg = await channel2.messages.fetch(messageId)
                if (!msg) return console.log('y')
                
            } finally {
                mongoose.connection.close()
            }    
        })
        

       /* await mongo().then(async (mongoose) => {
            try {
                await setchannel_message.findOneAndUpdate(
                    { 
                    _id : message.guild.id
                    },
                    {
                    _id : message.guild.id,
                    messageId : messageId
                    },
                    {
                        upsert: true,
                    } 
                )
            } finally {
                mongoose.connection.close()
            }    
        })*/
	}

});