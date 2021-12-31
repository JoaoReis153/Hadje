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
		.setTitle('Test')
		.setAuthor('Roronoa Zoro')
		.setImage('https://i.pinimg.com/originals/ee/37/a7/ee37a7000ee75937aac84b40ca9e931d.png')

		message.channel.send({ embeds : [embed]})
	}
});