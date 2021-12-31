/** @format */

const Command = require("../../Structures/Command.js");

const config = require('../../Data/config.json')

const emojis = require('../../Data/emojis.json')

module.exports = new Command({
	name: "gif",
	aliases: ['rgif', 'randomgif'],
	description: "Sends a random gif",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
		let keywords = "luffy"
        if (args[1] !== undefined) {
            keywords = args.slice(1).join(" ")
        }
        let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${config.gifapi}&limit=10000`
        let response = await fetch(url);
        let json =  await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        message.channel.send(json.results[index].url)
	}
});

