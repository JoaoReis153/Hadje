/** @format */

const config = require('../../Data/config.json')

var prefix

const { syntaxResponse, errorResponse }  = require('../../Util/Embeds/LOL/champ')

const color = require('../../Data/colors.json')

const Command = require("../../Structures/Command.js");

const prefixSchema = require("../../Schemas/prefix-schema");

const mongo  = require('../../Database/index')

const { Kayn, REGIONS } = require('kayn')

const kayn = Kayn(config.riotapikey)({
    region: REGIONS.EUROPE,
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

const Discord = require("discord.js");

module.exports = new Command({
	name: "champ",
    aliases: ['champion', 'campeão','campeao'],
	description: "General lol info",
	permission: "SEND_MESSAGES",
    botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }

        champ = args[1]

        if (!champ || champ === undefined) {
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
            

        champ = capitalizeFirstLetter(champ)

        kayn.DDragon.Champion.list()
            .callback(function(error, champions) {
                if (error) return console.log(error)



                if (champions.data[champ] === undefined)
                    return message.channel.send({ embeds : [errorResponse(champ)] } )

                let image_url = champions.data[champ].image.full
                let image=image_url.toLowerCase()

                const champe = new Discord.MessageEmbed();

                champe
                    .setTitle(`**${champ}**\u200B`)
                    .setURL(`https://leagueoflegends.fandom.com/wiki/${champ}/LoL`)
                    .setAuthor(``)
                    .setColor(color.lol_theme)
                    .setThumbnail(`https://fastcdn.mobalytics.gg/assets/lol/images/dd/champions/icons/${image}`)
                    .setFooter(`Version ${champions.version}`)
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
        
                message.channel.send({ embeds: [champe] });
        
                
                
            })
	}
});