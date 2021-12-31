/** @format */

const Command = require("../../Structures/Command.js");

const emojis = require('../../Data/emojis.json')

module.exports = new Command({
	name: "hello",
	aliases: ['olá', 'hi', 'ola', 'buenos', 'bonjour', 'Mekiee', 'buon','boa'],
	description: "Hello!",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
		const emoji = client.emojis.cache.get('814198026284695573')

		
		message.channel.send(`🍕 Buongiorno! 🍕`);
	}
});