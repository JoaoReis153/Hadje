/** @format */

const Command = require("../../Structures/Command.js");

const warnSchema = require('../../Schemas/warn-schema')

const mongo = require('../../Database/index')

const prefixSchema = require('../../Schemas/prefix-schema')
const Discord = require('discord.js')
const color = require('../../Data/colors.json')

const { syntaxResponse, confirmationResponse } = require('../../Util/Embeds/Moderation//warn')

module.exports = new Command({
	name: "warn",
    aliases: ["aviso"],
	description: "Invite link",
	permission: "KICK_MEMBERS",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

		const user = message.mentions.users.first()
		const _id = message.guildId
		const author = message.author.tag
		let reason = args.slice(2).join(' ')
		if (!reason || reason === undefined) {
			reason =  'Undefined'
		}
		const avatar = user.avatarURL({ dynamic: true })

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

		const userId = user.id
		const tag = user.tag

		const warning = {
			author: message.author.tag,
			timestamp: new Date().getTime(),
			reason
		}
		await mongo().then(async (mongoose) => {
			try {
				const data = await warnSchema.findOneAndUpdate(
				{	
					guildId : message.guild.id, 
					userId: userId,
				},{
					guildId : message.guild.id,
					userId,
					$push: {
						warnings: warning
					},
				},{
					upsert: true
				})
				message.channel.send({ embeds : [confirmationResponse(tag,avatar, reason, author)] })
			} finally {
				mongoose.connection.close()
			}    
		})

	}
});
