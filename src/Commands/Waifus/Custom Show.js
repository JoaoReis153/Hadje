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

                for (let a of data[0].images) {
                    if (a.includes('.gif')) {

                        const embed = new Discord.MessageEmbed()
                            .setImage(a)
                            .setColor('GREEN')

      
                        pages.push(embed)
                    } else {
                        a = a + '.png'
                       
                        const embed = new Discord.MessageEmbed()
                            .setImage(`${a}`)
                            .setColor('GREEN')

                    
                        
                   
                        pages.push(embed)
                    }

                }
         
                paginationEmbed(message, pages);
               
                                
            } catch(e) {
                console.log(e)
            } finally {
                mongoose.connection.close()
            }
        })


	}
});








