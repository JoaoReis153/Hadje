/** @format */

const { channel } = require("diagnostics_channel");
const Command = require("../../Structures/Command.js");
var quotes = []

module.exports = new Command({
	name: "v",
	description: "Invite link",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

		message.channel.send('Está travando')

		const canal = client.channels.cache.get('814157654808199260')

		

		canal.messages.fetch({ limit: 100 }).then(messages => {
            messages.forEach(message => {
				if (message.content.length !== 0){
				
					quotes.push(message.content.replaceAll('**',''))
		
				}
			})

			console.log(quotes)

			for(const quote of quotes )  {
				if (quote.includes('"')){
					message.channel.send(quote)
				}
			
			}
		})  
	}
});
