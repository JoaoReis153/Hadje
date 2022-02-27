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
		.setAuthor('Desert Doo-doo')
		.setDescription('One Piece <:male:452470164529872899> \n' +
		'*Animanga roulette* · **933**<:kakera:469835869059153940>\n' +
		'Claim Rank: #73\n' +
		'Like Rank: #17\n' +
		'Monkey D. Luffy (+24)')
		.setImage('https://imgur.com/L75Wl9p.gif.gif')

		message.channel.send({
			content: 'Wished by <@331469231730458624>',
			embeds : [embed]
		})
	}
});