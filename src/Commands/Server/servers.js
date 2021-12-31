/** @format */

const Command = require("../../Structures/Command");

const color = require('../../Data/colors.json')

const config = require('../../Data/config.json')

const guildId = ''

module.exports = new Command({
	name: "servers",
	description: "Shows servers",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
        if (message.author.id != config.my_id) return message.channel.send(`${args[0]} is not a valid command!`); 
        const msg = []
        for (const guild of client.guilds.cache) {
                const guildId = guild[1].id    
                const guild_name = guild[1].name
                msg.push(`**${guild_name}** (${guildId})\n` )
                     
        }        

        message.channel.send(msg.join(''))
   }
});
