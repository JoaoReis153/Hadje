/** @format */

const Command = require("../../Structures/command.js");

const fetch = require('node-fetch')

const mongo = require('../../Database/index')

const { syntaxResponse, formatResponse } = require('../../Util/Embeds/Others/anime')

const config = require('../../Data/config.json')

const prefixSchema = require('../../Schemas/guild-prefixes.js')


module.exports = new Command({
	name: "anime",
    aliases: ['animeinfo'],
	description: "Specific anime info",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

        const search_term = args.slice(1).join(' ')

        if (!search_term || search_term === undefined) {
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
            
			return message.channel.send({embeds:[syntaxResponse(prefix)]});
        }


        var query = `
        query ($search:String) {
            Media (search: $search, type: ANIME) {
                id
                description
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                  }
                genres
                idMal
                title {
                    romaji
                    english
                    native
                }
                startDate {year,month,day}
                endDate {year,month,day}
                episodes
                duration
                averageScore
            }
          }
        `;
        
        var variables = {
            search: search_term
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
        
        function handleData(data) {
            const dat = data.data.Media
            const id  = dat.id
            const thumbnail = dat.coverImage.extraLarge
            const color = dat.coverImage.color
            const url = `https://anilist.co/anime/${id}`
            const genres = dat.genres.join(', ')
            let description = dat.description.replace(/<br>/g, '').replace(/<b>/g, '*').replace("</b>", '**')
            const title_romaji = dat.title.romaji
            const title_english = dat.title.english
            const startDate = `${dat.startDate.year}-${dat.startDate.month}-${dat.startDate.day}`
            let endDate = dat.endDate
            let episodes = dat.episodes
            const duration = String(dat.duration)
            const averageScore = String(dat.averageScore)
            let status = 'Finished'

            if (!episodes) {
                endDate = '?'
                episodes = '?'
                status = 'Airing'
            } else {
                episodes = String(dat.episodes)
                endDate = `${dat.endDate.year}-${dat.endDate.month}-${dat.endDate.day}`
            }
            const date = `From **${startDate}** to **${endDate}**`
       //     console.log(episodes,duration, date)
            message.channel.send({ embeds : [formatResponse(title_english, url, description, status, genres,date,episodes,duration, averageScore, thumbnail,color)] })
        }
        
        function handleError(error) {
            console.error(error);
        }}
});
