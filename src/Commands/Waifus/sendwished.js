/** @format */

const Command = require("../../Structures/Command.js");

const Discord = require('discord.js')

const config = require('../../Data/config.json')

module.exports = new Command({
	name: "wished",
	description: "Hello!",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
		if (message.author.id != config.my_id) return; 

		
		const embed = new Discord.MessageEmbed()
		.setColor(1360437)
		.setTitle('Jujutsu kaisen')
		.setAuthor('Satoru Gojo')
		.setImage('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fen.memesrandom.com%2Fwp-content%2Fuploads%2F2021%2F04%2FGojo.jpg&f=1&nofb=1')

		message.channel.send({
			content: 'Wished by <@331469231730458624>',
			embeds : [embed]
		})
	}
});