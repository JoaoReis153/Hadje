/** @format */

const Discord = require('discord.js')

const config = require('../../Data/config.json')

const customEmbed = require('../../Schemas/customembed')

const Command = require("../../Structures/Command.js");

const mongo = require('../../Database/index');

const prefixSchema = require('../../Schemas/guild-prefixes')

const { syntaxResponse, doesnotexist } = require('../../Util/Embeds/Waifus/customremove')

var num, customName

module.exports = new Command({
	name: "imremove",
	description: "Adds pictures to the custom embed",           
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
   
        args = args.slice(1)
        const args2 = args.join(' ').split('$')
        customName = args2[0].toLowerCase()
        num = args2[1]
        
        if (!num || isNaN(num)) {
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
                if (!data) {
                    return message.channel.send({embeds:[doesnotexist(customName)]});
                }

                await customEmbed.updateOne({customname: customName}, { $pull: { 'images' : data[0].images[num-1]}})
                message.react('✅')
                

            } finally {
                mongoose.connection.close()
            }    
        })
        
        


	}
});








