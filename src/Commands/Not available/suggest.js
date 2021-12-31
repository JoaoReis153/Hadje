/** @format */

const Command = require("../../Structures/Command.js");

const color = require('../../Data/colors.json')

const Discord = require('discord.js')

const prefixSchema = require('../../Schemas/prefix-schema')

const mongo = require('../../Database/index.js')

const config = require('../../Data/config.json')

const { syntaxResponse, suggestionResponse, thankyouResponse } = require('../../Util/Embeds/suggest.js')

module.exports = new Command({
	name: "suggest",
	aliases: ["suggestion","suggestao", "suggest"],
	description: "Lets the bot owner receive a suggestion of a command or a report ",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

		const suggestion = args.slice(1).join(' ')

		if (!suggestion || suggestion === undefined) {
		
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

		const author_username = message.author.username
        const author_id = message.author.id
        const author_avatar = message.author.avatarURL({ dynamic: true })

        client.channels.cache.get(config.suggestion_channel).send({embeds : [suggestionResponse(author_id, suggestion)]});

		message.channel.send({ embeds : [thankyouResponse(author_id)] })
		

	}
});



