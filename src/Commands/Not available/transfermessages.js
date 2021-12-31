/** @format */

const Command = require("../../Structures/Command");

const color = require('../../Data/colors.json')

const config = require('../../Data/config.json')

module.exports = new Command({
	name: "transfermessages",
    aliases: ['tm'],
	description: "transfer messages ffrom one channel to another",
	permission: "SEND_MESSAGES",
	botpermission: "VIEW_CHANNEL",
	async run(message, args, client) {

        const canal = client.channels.cache.get('893898047904419870')
        const channel1 = client.channels.cache.get('893915795820781638')
        const channel2 = client.channels.cache.get('893915814850338816')
        const channel3 = client.channels.cache.get('893915830805495818')

        const gartic_phone = client.channels.cache.get('884552682520576070')
        
        canal.messages.fetch({ limit: 100 }).then(messages => {
            messages.forEach(message => gartic_phone.send(message.content))
          })                
        }        
});
