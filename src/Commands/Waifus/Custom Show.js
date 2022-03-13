/** @format */

const Discord = require('discord.js')

const config = require('../../Data/config.json')

const customEmbed = require('../../Schemas/customembed')

const Command = require("../../Structures/Command.js");

const mongo = require('../../Database/index');

const prefixSchema = require('../../Schemas/guild-prefixes')

const {syntaxResponse} = require('../../Util/Embeds/Waifus/customshow')

const paginationEmbed = require('discord.js-pagination'); 

var customName, images



module.exports = new Command({
	name: "im",
	description: "Adds pictures to the custom embed",           
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
   
        args = args.slice(1)
        const args2 = args.join(' ').split('$')
        customName = args2[0].toLowerCase()
        images = args2.slice(1)


        function capitalizeFirstLetterOfEachWord(sentence) {
            let words = sentence.split(" ");

            for (let i = 0; i < words.length; i++) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
            
            const final = words.join(' ')
            return final
       
        }
        
        
        if (!customName || customName == '') {
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



		await mongo().then(async (mongoose) => {
            try {

                const data = await customEmbed.find({customname : customName})
                if (data[0] === undefined) {
                    const undefinedEmbed = new Discord.MessageEmbed()
                        .setDescription(`There is no such custom of **${customName}**`)
                        .setColor('GREEN')

                   
                    return message.channel.send({ embeds: [undefinedEmbed]})
                }
         
                let pages = []

                for (const image of data[0].images) {

                    if (!data[0].color || data[0].color === undefined) {

                        const embed = new Discord.MessageEmbed()
                            .setTitle(capitalizeFirstLetterOfEachWord(data[0].customname))
                            .setImage(image)
                            .setColor('GREEN')

      
                        pages.push(embed)
                    } else {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(capitalizeFirstLetterOfEachWord(data[0].customname))
                            .setImage(image)
                            .setColor(data[0].color)

                            pages.push(embed)
                    }

                }
                
                try  {
                    paginationEmbed(message, pages);
                } catch(e) {
                    console.log(e)
                } 
                
               
           ///a       
            } catch(e) {
                console.log(e)
            } finally {
                mongoose.connection.close()
            }
        })


	}
});








