/** @format */

const Discord = require("discord.js");
const Event = require("../Structures/Event.js");
const config = require('../Data/config.json')
const color = require('../Data/colors.json')
const cron = require('cron');

module.exports = new Event("ready", client => {
	console.log("(Client Status) - Ready");
	console.log("----------------------------");

	const online = new Discord.MessageEmbed()
	.setDescription('🟢 **ONLINE**')
	.setColor(color.clientOnline)

	client.channels.cache.get(config.channel_status).send({ embeds : [online]})


	let reminder = new cron.CronJob('* * * * *', () => {
			client.users.cache.get(331469231730458624).send('**Waifus Reset**');
		  });
			  
		  
	reminder.start()


});
