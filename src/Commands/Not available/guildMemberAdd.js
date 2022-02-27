/** @format */

var clean_text,  welcome_channel

const Event = require("../../Structures/Event.js");

const Discord = require('discord.js')

const mongo = require('../../Database/index.js')

const welcomeSchema = require('../Schemas/welcome-schema.js')

module.exports = new Event("guildMemberAdd", async (client, member) => {

    await mongo().then(async (mongoose) => {
		try {
			const data = await welcomeSchema.findOne({_id:  member.guild.id})
			if (!data) 
				return 
            welcome_channel = member.guild.channels.cache.get(data.channelId)
            clean_text = data.text.replace('<@>', `<@${member.id}>`)
            
		} finally {
			mongoose.connection.close
		}
	})
	if (typeof(clean_text) == 'undefined') 
		return console.log('No data found')
    welcome_channel.send(clean_text)
});