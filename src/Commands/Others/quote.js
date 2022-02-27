/** @format */


const { getQuote } = require('../../Util/API/fetch-quote')

const { errorResponse, formatResponse, syntaxResponse} = require('../../Util/Embeds/Others/quotes.js')

const Command = require("../../Structures/Command.js");

const prefixSchema = require('../../Schemas/guild-prefixes.js')

const mongo = require('../../Database/index')

const Discord = require("discord.js");

module.exports = new Command({
	name: "quote",
    aliases: ["fala", "frase", "qute", "quot", "q", 'quotes'],
	description: "Gives quote",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

        const type = args[1]

        if (!type) {
            const response = await getQuote('/random');
			return message.channel.send({ embeds : [formatResponse(response)]});
        }

        else if(type === 'anime') {
			const animeName = args.slice(2).join(' ');
			if(!animeName) {
				return message.channel.send({ embeds : [errorResponse('Please provide a valid anime name')]});
			}

			const response = await getQuote(`/random/anime?title=${animeName}`);

			if(!response || response === undefined) {
				return message.channel.send({ embeds : [errorResponse(`No quotes found`)]});
			}

			return message.channel.send({ embeds : [formatResponse(response)]});
		}

        else if(type === 'char') {
			const characterName = args.slice(2).join(' ');
			if(!characterName) {
				return message.channel.send({ embeds : [errorResponse('Please provide a valid char name')]});
			}

			const response = await getQuote(`/random/character?name=${characterName}`, message);

			if(!response) return message.channel.send({ embeds : [errorResponse(`No quotes found`)]});

			return message.channel.send({ embeds : [formatResponse(response)]});
		}

        else {
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
	}
});
