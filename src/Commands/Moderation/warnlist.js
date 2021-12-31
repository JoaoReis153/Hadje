/** @format */

const Command = require("../../Structures/Command.js");

const warnSchema = require('../../Schemas/warn-schema')

const mongo = require('../../Database/index')

const prefixSchema = require('../../Schemas/prefix-schema')

const Discord = require('discord.js')

const color = require('../../Data/colors.json')

const { syntaxResponse, nodataFound } = require('../../Util/Embeds/Moderation//warnlist.js')

module.exports = new Command({
	name: "warnlist",
    aliases: ["wl"],
	description: "Invite link",
	permission: "KICK_MEMBERS",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

		const user = message.mentions.users.first()
		
		const _id = message.guildId
		const reason = args.slice(2).join(' ')

		if (!user) {
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

		const tag = user.tag
		const userId = user.id

		await mongo().then(async (mongoose) => {
			try {
				const data = await warnSchema.findOne(
				{	
					guildId : message.guild.id, 
					userId: userId,
				})

				if (!data) {
					return message.reply({ embeds : [nodataFound(tag)]})
				}

				const warningHistory = new Discord.MessageEmbed()
					.setTitle(`⚠️ Warning history:\n\u200B`)
					.setColor(color.warninghistory)
				
				let i = 1	
				for (const warning of data.warnings) {
					const { author, timestamp, reason } = warning

					if (!reason) {
						warningHistory.addField(`${i}º  by  ${author}`,`${new Date(timestamp).toLocaleDateString()}\n**Reason:** \nUndefined\n\u200B`)
					} else {
						warningHistory.addField(`${i}º by ${author}`,`${new Date(timestamp).toLocaleDateString()}\n**Reason:** \n${reason}\n\u200B`)
					}

					i += 1
				}

				message.channel.send({embeds : [warningHistory]})
			} finally {
				mongoose.connection.close()
			}    
		})

	}
});
