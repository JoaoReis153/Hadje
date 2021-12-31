/** @format */

const Command = require("../../Structures/Command.js");

const config = require('../../Data/config.json')

const ani_watched = require('../../Schemas/ani_watched')

const prefixSchema = require('../../Schemas/prefix-schema')

const { noonesawResponse, syntaxResponse, errorResponse } = require('../../Util/Embeds/whosaw')

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
		query ($search: String) { 
			Media (search: $search, type: ANIME) {
			  title {
				romaji
				english
				native
			  }
			}
		  }
		`;
		// Define our query variables and values that will be used in the query request
		var variables = {
			search: anime_name
		};
		// Define the config we'll need for our Api request
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

			let title = data.data.Media.title.romaji

			await mongo().then(async (mongoose) => {
				try {
					const data2 = await ani_watched.find()
					
		
					if (!data2 || data2[0] === undefined) {
						return message.reply({ embeds : [noonesawResponse(title)]})
					}
				
					let users_id = []
					for(const obj of data2) {
						if (obj.animes.includes(title)) {
							users_id.push(`・ **${obj.anilist_username}**\n`)
						}
					}
					if (users_id[0] === undefined) {
						return message.reply("No one saw `" + title + "`")
					}
					message.reply(users_id.join(''))
		
				} catch(e){
					console.log(e)
				}finally {mongoose.connection.close()}    
			})
		}
		function handleError(error) {
			message.channel.send({ embeds : [errorResponse()]})
		}	
	}
})



