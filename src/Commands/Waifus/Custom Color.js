/** @format */

const Discord = require('discord.js')

const config = require('../../Data/config.json')

const customEmbed = require('../../Schemas/customembed')

const Command = require("../../Structures/command.js");

const prefixSchema = require('../../Schemas/guild-prefixes')

const mongo = require('../../Database/index');

const {syntaxResponse, imgurError, galleryError} = require('../../Util/Embeds/Waifus/customcolor')

var customName

module.exports = new Command({
	name: "imcolor",
    aliases: ["embedcolor", "colorembed"],
	description: "Sets embed color",           
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

        
        args = args.slice(1)
        const args2 = args.join(' ').split('$')
        customName = args2[0].toLowerCase()
        embedColor = args2.slice(1)[0]
   
        if (!customName || customName == '' || !embedColor || embedColor === '') {
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
                await customEmbed.findOneAndUpdate(
                    {
                        customname : customName,
                    },{
                        customname : customName,
                        color: embedColor
                    },{
                        upsert:true
                    }
                )
                message.react('✅')

            } finally {
                mongoose.connection.close()
            } 
        })
        


    }
})