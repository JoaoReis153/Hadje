/** @format */

const Event = require("../Structures/Event.js");

const Discord = require('discord.js')

const config = require('../Data/config.json')

const mongo = require('../Database/index.js')

const prefixSchema = require("../Schemas/guild-prefixes.js");

const wishanimeSchema = require('../Schemas/wishanime')

const enabledm = require('../Schemas/enabledisabledm')

const color = require('../Data/colors.json');

const warnSchema = require('../Schemas/warn-schema')

const messageCreate = require("./messageCreate.js");

module.exports = new Event("guildDelete", async (client, guild) => {

    await mongo().then(async (mongoose) => {
		try {
			await prefixSchema.deleteOne({ _id : guild.id })
			await wishanimeSchema.deleteMany({ guildId : guild.id })
			await enabledm.deleteOne({ guildId : guild.id})
			await warnSchema.deleteMany({ guildId : guild.id })
	
		} finally {
			mongoose.connection.close
		}
	})



	ownerId = client.users.cache.get(guild.ownerId)

	const removed_server = new Discord.MessageEmbed()
			.setTitle('❌  Removed from a server')
			.setDescription(`Server name: **${guild.name}**
							Server owner: **${ownerId}**
							ID: **${guild.id}**`)
			.setImage(guild.iconURL({dynamic: true, size: 2048}))
			.setColor(color.guildDeleted)

	client.channels.cache.get(config.channel_create_delete).send({embeds : [removed_server]});	


});