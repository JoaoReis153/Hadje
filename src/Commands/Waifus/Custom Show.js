/** @format */

const Discord = require('discord.js')

const config = require('../../Data/config.json')

const customEmbed = require('../../Schemas/customembed')

const Command = require("../../Structures/Command.js");

const mongo = require('../../Database/index');

const prefixSchema = require('../../Schemas/guild-prefixes')
 
const { ButtonPaginator } = require('@psibean/discord.js-pagination');

const {syntaxResponse} = require('../../Util/Embeds/Waifus/customshow')

var customName, images

var pages = []

module.exports = new Command({
	name: "showic",
	description: "Adds pictures to the custom embed",           
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
        message.reply("It's working")
//$ic customName$url$url$url$url
        args = args.slice(1)
        customName = args[0]
        
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
                console.log(data)

                for (let i=0 ; i<0 ; i++) {
                    const pageEmbed = new MessageEmbed();
                    pageEmbed 
                        .setAuthor(data.customName)
                        .setThumbnail(data.image[i])
                        
                    pages.push(pageEmbed)
                }
      

                const buttonPaginator = new ButtonPaginator(interaction, { pages });
                await buttonPaginator.send();
                                
            } catch(e) {
                console.log(e)
            } finally {
                mongoose.connection.close()
            }
        })


	}
});








