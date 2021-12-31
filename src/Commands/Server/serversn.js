/** @format */

const Command = require("../../Structures/Command");

const color = require('../../Data/colors.json')

const config = require('../../Data/config.json')

module.exports = new Command({
	name: "serversn",
	description: "Shows servers",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
        if (message.author.id != config.my_id) return message.channel.send(`${args[0]} is not a valid command!`); 
                
        let guilds_number = client.guilds.cache.size
		
        message.channel.send(`**Servers: ${guilds_number}**`)
   }
});
