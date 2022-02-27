/** @format */

const Command = require("../../Structures/Command");

const color = require('../../Data/colors.json')

const prefixSchema = require('../../Schemas/guild-prefixes')

const mongo = require('../../Database/index')

const config = require('../../Data/config.json')

const emojis = require('../../Data/emojis.json');

const Discord  = require("discord.js");

const { syntaxResponse, cannotclearResponse, messagesclearedResponse } = require('../../Util/Embeds/Moderation/clear')

var prefix

module.exports = new Command({
	name: "clear",
	aliases: ['delete', 'limpar', 'del', 'cls'],
	description: "Clear an amount of messages",
	permission: "MANAGE_MESSAGES",
	botpermission: "MANAGE_MESSAGES",
	async run(message, args, client) {

		const amount = args[1];

		if (!amount || isNaN(amount)) {
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
			

		const amountParsed = parseInt(amount);

		if (amountParsed > 99)
			return message.channel.send({ embeds : [ cannotclearResponse() ] });

		const lixo = client.emojis.cache.get(emojis.lixo)
		
		try {
			message.channel.bulkDelete(amountParsed, true)
			.then(async messages => {

				const size = messages.size
		
				const msg = await message.channel.send({ embeds : [ messagesclearedResponse(size, lixo) ]})
				setTimeout(() => {
					try {
							msg.delete()
						} catch(e) {
							console.log(e)
						}
				}, 1000)
			})
			.catch(console.error);
		}catch (e) {console.log(e)}		
	}
});
