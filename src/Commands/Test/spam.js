/** @format */

const Command = require("../../Structures/Command.js");

const config = require('../../Data/config.json')

module.exports = new Command({
	name: "spam",
	description: "d",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
        if (message.author.id != config.my_id) return; 
		for (let i = 0; i<10000; i++) {
            message.channel.send('.')
        }
	}
});
