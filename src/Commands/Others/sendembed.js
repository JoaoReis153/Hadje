/** @format */

const Discord = require('discord.js')
const Command = require("../../Structures/Command.js");
const prefixSchema = require('../../Schemas/guild-prefixes.js')
const mongo = require('../../Database/index')
const { syntaxResponse } = require('../../Util/Embeds/Others/sendembed')

module.exports = new Command({
	name: "sendembed",
	description: "Invite link",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

		args = args.slice(1)

		const divider = args.join(' ').split('|')

		const quote_author = divider[0]

		const quote_content = divider[1]

		if (!quote_author || quote_author === undefined || !quote_content || quote_content === undefined ) {
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
            
			return message.channel.send({embeds:[syntaxResponse(prefix)]});
        }

		try {
			message.delete()
		} catch (e) {
			console.log(e)
		}

	 	

		const msgfx = new Discord.MessageEmbed()
			.setAuthor(quote_author)
			.setDescription(quote_content)
			.setColor("BLUE")

		message.channel.send({ embeds : [ msgfx ]})
	}
});
