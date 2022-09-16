/** @format */

const Discord = require('discord.js')

const config = require('../../Data/config.json')

const Command = require("../../Structures/command.js");

module.exports = new Command({
	name: "ping",
	description: "Shows the ping of the bot!",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
		if (message.author.id != config.my_id) return; 
		message.channel.send('Loading data').then (async (msg) => {
			msg.delete()
			const ping = new Discord.MessageEmbed()
			.setDescription(`🏓   ${msg.createdTimestamp - message.createdTimestamp}ms`)
			.setColor('WHITE')

			message.channel.send({ embeds : [ ping ]});
		})
	}
});
