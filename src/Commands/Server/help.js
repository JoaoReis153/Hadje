/** @format */

const Command = require("../../Structures/Command.js");

const color = require('../../Data/colors.json')

const Discord = require('discord.js')

const prefixSchema = require('../../Schemas/guild-prefixes')

const mongo = require('../../Database/index')

const { helpResponse, helpserverResponse, helpmoderationResponse, helplolResponse, helpwaifusResponse, helpsearchResponse } = require('../../Util/Embeds/Server/help')

const config = require('../../Data/config.json')

module.exports = new Command({
	name: "help",
	aliases: ["h","ajuda"],
	description: "Help command",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

		const specific = args[1]


		const client_avatar = client.user.avatarURL({ dynamic: true })
		const client_username = client.user.username

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

			if (specific === 'server') {
				return message.channel.send({ embeds: [helpserverResponse(prefix, client_username, client_avatar)] });
			} else if (specific == 'moderation') {
				return message.channel.send({ embeds: [helpmoderationResponse(prefix, client_username, client_avatar)] })
			} else if (specific == 'lol' || specific == 'league' || specific == 'League') {
				return message.channel.send({ embeds: [helplolResponse(prefix, client_username, client_avatar)] })
			} else if (specific == 'waifus') {
				return message.channel.send({ embeds: [helpwaifusResponse(prefix, client_username, client_avatar)] })
			} else if (specific == 'search') {
				return message.channel.send({ embeds: [helpsearchResponse(prefix, client_username, client_avatar)] })
			} else {
				return message.channel.send({ embeds: [helpResponse(prefix, client_username, client_avatar)] });
			}	
		})
	}
});




