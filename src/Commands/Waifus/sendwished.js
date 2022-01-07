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
		.setImage('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F37%2Fb0%2F67%2F37b0676ec8162bfa9c1d88487cca8462.jpg&f=1&nofb=1')

		message.channel.send({
			content: 'Wished by <@331469231730458624>',
			embeds : [embed]
		})
	}
});