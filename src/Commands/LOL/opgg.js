/** @format */

const config = require('../../Data/config.json')

const color = require('../../Data/colors.json')

const Command = require("../../Structures/command.js");

const mongo = require('../../Database/index')

const prefixSchema = require('../../Schemas/guild-prefixes')

const Discord = require("discord.js");

const { syntaxResponse, regionResponse, regionerrorResponse } = require('../../Util/Embeds/LOL/opgg')
 
var prefix

module.exports = new Command({
	name: "op.gg",
	aliases: ['opgg', 'op', 'gg'],
	description: "Gives the opgg of a user",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

		const user = args[1]			

		if (!user || user === undefined)  {
				await mongo().then(async (mongoose) => {
					try {
						const data = await prefixSchema.findOne({ _id : message.guild.id})
						if (!data) {
							prefix = config.prefix
						} else {
							prefix = data.prefix
						}		
					} finally {
						mongoose.connection.close()
					}
				})
				return message.channel.send({ embeds: [ syntaxResponse(prefix) ]});
		}
           

		let region = args.slice(2).join(' ').toLowerCase()

		var url_region = ''


		regions_list = ['europe', 'euw', 'europa',
						'north america', 'na', 'america',
						'korea', 'kr', 'coreia',
						'brazil', 'br', 'brasil',
						'oceania', 'oce']

		europe = ['europe', 'euw', 'europa']
		north_america = ['north america', 'na', 'america']
		korea = ['korea', 'kr', 'coreia']
		brazil = ['brazil', 'br', 'brasil']
		oceania = ['oceania', 'oce']



		if (region[0] !== undefined && regions_list.includes(region)) {		

			if (europe.includes(region)) 
				url_region = "euw.op.gg"	

			if (north_america.includes(region)) 
				url_region = "na.op.gg"	

			if (korea.includes(region))
				url_region = "www.op.gg"
			
			if (brazil.includes(region))
				url_region = "br.op.gg"
			
			if (oceania.includes(region))
				url_region = "oce.op.gg"

		} else if (!regions_list.includes(region) && typeof(region[0]) === 'string') 
		
				return message.channel.send({embeds:  [regionerrorResponse()] })

		else {
			url_region = "euw.op.gg"
		}

		
		message.channel.send({embeds:  [regionResponse(url_region, user)] })
	}
});