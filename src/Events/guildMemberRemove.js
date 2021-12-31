/** @format */

var clean_text,  welcome_channel

const Event = require("../Structures/Event.js");

const Discord = require('discord.js')

const mongo = require('../Database/index.js')

const wishanimeSchema = require('../Schemas/wishanime')

const enabledm = require('../Schemas/dm')

const color = require('../Data/colors.json');

module.exports = new Event("guildMemberRemove", async (client, member) => {

    await mongo().then(async (mongoose) => {
		try {
			const data = await wishanimeSchema.find({ guildId : member.guild.id })
			const animes = []
			for (const obj of data) {
				if (obj.users.includes(member.id)) {
					animes.push(obj.anime)
				} 
			}
			for (const obj2 of animes) {
				await wishanimeSchema.updateMany({guildId : member.guild.id, anime: obj2}, { $pull: { 'users' : member.id}})
			}

			await enabledm.updateOne({guildId : member.guild.id}, { $pull : { 'users' : member.id}})
			
		

		} finally {
			mongoose.connection.close
		}
	})
});