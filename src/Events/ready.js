/** @format */

const Discord = require("discord.js");
const Event = require("../Structures/Event.js");
const config = require('../Data/config.json')
const color = require('../Data/colors.json')

module.exports = new Event("ready", client => {
	console.log("(Client Status) - Ready");
	console.log("----------------------------");

	const online = new Discord.MessageEmbed()
	.setDescription('🟢 **ONLINE**')
	.setColor(color.clientOnline)

	client.channels.cache.get(config.channel_status).send({ embeds : [online]})
});
