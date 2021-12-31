/** @format */

const Command = require("../../Structures/Command.js");

const config = require('../../Data/config.json')

const Discord = require('discord.js')

const color = require('../../Data/colors.json')

const prefixSchema = require('../../Schemas/prefix-schema')

const { nowishesResponse, syntaxResponse } = require('../../Util/Embeds/whosaw')

const wishanimeSchema = require('../../Schemas/wishanime')

const mongo = require('../../Database/index');

module.exports = new Command({
	name: "whosaw",
	description: "YOHOHO",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

		const anime_name = args.slice(1).join(' ')

            if (!anime_name) {
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
                
                return message.channel.send({ embeds : [ syntaxResponse(prefix) ]});
            }
		
		var query = `
			query ($search:String) { 
				Media (search: $search, type: ANIME) { 
					title {
						romaji
						english
						native
					}
			
				}
			}
			`;
			
			var variables = {
				search: anime_name
			};
			
			var url = 'https://graphql.anilist.co',
				options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					body: JSON.stringify({
						query: query,
						variables: variables
					})
				};
			
			// Make the HTTP Api request
			fetch(url, options).then(handleResponse)
							.then(handleData)
							.catch(handleError);
			
			function handleResponse(response) {
				return response.json().then(function (json) {
					return response.ok ? json : Promise.reject(json);
				});
			}
			
			
			
			async function handleData(data) {
			
				const title_english = data.data.Media.title.romaji
			
				
			
				await mongo().then(async (mongoose) => {
					try {
						const data2 = await wishanimeSchema.find({guildId : message.guild.id, anime: title_english})
			
						if (!data2 || data2[0] === undefined) {
							return message.reply({ embeds : [nowishesResponse(title_english)]})
						}
			
						let users_list = []
			
			
						for (const user in data2[0].users) {
							users_list.push(`<@${data2[0].users[user]}> `)
						}
			
						message.channel.send(users_list.join(' '))
			
					} catch(e){
						console.log(e)
					}finally {mongoose.connection.close()}    
				})
			}
			
			function handleError(error) {
				console.error(error);  
			}
	}
})

