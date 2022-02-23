/** @format */

const Discord = require("discord.js");
const Event = require("../Structures/Event.js");
const config = require('../Data/config.json')
const color = require('../Data/colors.json')
const cron = require('cron');

module.exports = new Event("ready", client => {
	console.log("(Client Status) - Ready");
	console.log("----------------------------");


	/*
	client.user.setPresence({
		status: 'invisible',
	   });
	*/

	const online = new Discord.MessageEmbed()
	.setDescription('🟢 **ONLINE**')
	.setColor(color.clientOnline)

	client.channels.cache.get(config.channel_status).send({ embeds : [online]})

/*
	let reminder1 = new cron.CronJob('39 1,4,7,10,13,16,19,22 * * *', () => {
			client.channels.get('831901930589782106').send('**Waifus Reset(0/2)**')
			client.channels.get('893507732039143475').send('**Waifus Reset(0/2)**')
		  });

	let reminder2 = new cron.CronJob('39 2,5,8,11,14,17,20,23 * * *', () => {
		client.channels.get('831901930589782106').send('**Waifus Reset(1/2)**')
		client.channels.get('893507732039143475').send('**Waifus Reset(1/2)**')
		  });
		
	let reminder3 = new cron.CronJob('39 3,6,9,12,15,18,21,0 * * *', () => {
		client.channels.get('831901930589782106').send('**Waifus Reset(2/2)**')
		client.channels.get('893507732039143475').send('**Waifus Reset(2/2)**')
		  });
			  
 
	reminder1.start()
	reminder2.start()
	reminder3.start()
*/
});
