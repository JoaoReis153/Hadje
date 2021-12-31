/** @format */

const Command = require("../../Structures/Command.js");

const config = require('../../Data/config.json')

const prefixSchema = require('../../Schemas/prefix-schema')

const ani_watched = require('../../Schemas/ani_watched')

const { syntaxResponse, tryagainResponse, errorResponse } = require('../../Util/Embeds/store_animes')

const mongo = require('../../Database/index');

var animes_list = []

module.exports = new Command({
	name: "storeanimes",
    aliases : ["storeanime"], 
	description: "YOHOHO",
	permission: "SEND_MESSAGES",
	botpermission: "ADD_REACTIONS",
	async run(message, args, client) {

		const user = message.mentions.members.first()  
        const anilist_username = args[1]

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }

            if (!user || !anilist_username || !isNaN(anilist_username)) {
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
		
        const userId = user.id

        for (let p = 1; p<10; p++) {

        
            
            var query = `
            query ($page: Int, $userName: String, $perPage: Int) {
                Page(page: $page, perPage: $perPage) {
                
                mediaList(userName: $userName, status: COMPLETED) {
                    media {
                    title {
                        romaji
                    }
                    }
                }
                }
            } 
            `;
            // Define our query variables and values that will be used in the query request
            var variables = {
                page:p, userName: anilist_username, perPage: 50
            };
            console.log(anilist_username)
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
            async function handleData (data) {

            



                console.log(data.data.Page.mediaList.media)
                
                for (const obj of data.data.Page.mediaList) {
                    animes_list.push(obj.media.title.romaji)
                  
                }

                

                if (p === 9) {
 
                   
                    const lista = animes_list.filter(onlyUnique)
                    console.log(lista)

                    await mongo().then(async (mongoose) => {
                        try{
                            await ani_watched.updateOne({ userId : userId}, {$set: { animes : []}})
                          
                            await ani_watched.findOneAndUpdate(
                                {
                                    userId: userId
                                }, 
                                {
                                    userId,
                                    anilist_username,
                                    $push : { animes : { $each : lista}}
                                },
                                {
                                    upsert: true
                                })
                        
                            message.react('✅')
                        } catch(e) {
                            console.log(e)
                            message.channel.send({ embeds : [tryagainResponse()]})
                        } finally {
                            mongoose.connection.close()
                        }
                    })
                }
                
            }
            
     
            function handleError(error) {
                console.log(error)
                message.channel.send({embeds : [errorResponse()]})
            }
    }   

   

 }
})
