/** @format */

const fs = require('fs')

const config = require('../../Data/config.json')

const color = require('../../Data/colors.json')

const Command = require("../../Structures/Command.js");

const { Kayn, REGIONS } = require('kayn')

const mongo = require('../../Database/index.js')

const prefixSchema = require('../../Schemas/prefix-schema')

const Discord = require("discord.js");

var prefix

module.exports = new Command({
	name: "user",
    aliases: ['usuário', 'usuario', 'username'],
	description: "General lol info",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
        if (args[0] == 'user') return message.channel.send('user is not a valid command')

        const kayn = Kayn(config.riotapikey)({
            region: REGIONS.EUROPE_WEST,
            apiURLPrefix: 'https://%s.api.riotgames.com',
            locale: 'en_US',
            debugOptions: {
                isEnabled: true,
                showKey: false,
            },
            requestOptions: {
                shouldRetry: true,
                numberOfRetriesBeforeAbort: 3,
                delayBeforeRetry: 500,
                burst: false,
                shouldExitOn403: false,
            },
        })
        

        username = args[1]
        

        if (!username || username === undefined) {
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
            const syntax_error = new Discord.MessageEmbed()
			.setDescription(`Syntax: **${prefix}user <username>**`)
			.setColor(color.syntax)

			return message.channel.send({embeds:[syntax_error]});
        }
            

        console.log(username)
        
        kayn.Summoner.by.name(username).callback(function(error, summoner) {
                if (error) return console.log(error)

                console.log(summoner)

                let iconId = summoner['profileIconId'] 

                const image = fs.readdirSync(`../../../11.19.1/img/profileicon/${iconId}.png`)





/*
                const embed = new Discord.MessageEmbed();

                embed
                    .setTitle(`**${champ}**\u200B`)
                    .setURL(`https://leagueoflegends.fandom.com/wiki/${champ}/LoL`)
                    .setAuthor(``)
                    .setColor("RED")
                    .setThumbnail(`https://fastcdn.mobalytics.gg/assets/lol/images/dd/champions/icons/${image}`)
                    .addFields(
                        {
                            name: `Type:`,
                            value: `${champions.data[champ].tags.join(', ')}\n\u200B`,
                            inline: false
                        },
                        {
                            name: capitalizeFirstLetter(champions.data[champ].title) ,
                            value: `${champions.data[champ].blurb}\n\u200B`,
                            inline: false
                        }
                    );
        
                message.channel.send({ embeds: [embed] });
                */
            })   
            
       
	}
});