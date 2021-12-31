const fetch = require('node-fetch')

const config = require('../../Data/config.json')

const Command = require("../../Structures/Command.js");

const Discord = require('discord.js')

const color = require('../../Data/colors.json')

module.exports = new Command({
	name: "space",
	description: "Sends a daily nasa's space picture ",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
		
		let url = `https://api.nasa.gov/planetary/apod?api_key=${config.nasaapi}`
        let response = await fetch(url)
        let json = await response.json()

		const space = new Discord.MessageEmbed()
		.setTitle('Space photo of the day')
		.setImage(json.url)
		.setColor(color.space)

        message.channel.send({ embeds : [space] })
	}
});
