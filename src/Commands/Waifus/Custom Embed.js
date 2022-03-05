/** @format */
//A
const Discord = require('discord.js')

const config = require('../../Data/config.json')

const customEmbed = require('../../Schemas/customembed')

const Command = require("../../Structures/Command.js");

const prefixSchema = require('../../Schemas/guild-prefixes')

const mongo = require('../../Database/index');

const {syntaxResponse, imgurError, galleryError} = require('../../Util/Embeds/Waifus/customembed')

var customName, images

module.exports = new Command({
	name: "ic",
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


        for (let image of images) {
           
            if (!image.includes('https://imgur.com/')) {
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
                return message.channel.send({embeds:[imgurError(prefix)]});
            }
           
            else if (image.includes('https://imgur.com/gallery')) {
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
                return message.channel.send({embeds:[galleryError(prefix)]});
            }
        }
        

		await mongo().then(async (mongoose) => {
            try {
                const data = await customEmbed.findOne({customname: customName})

                for (const image of images) {
             
                    if (data !== null) {
                            
                            if (data.images.includes(image)) {

                                return message.react('✅')

                            } else {
                               
                                await customEmbed.findOneAndUpdate(
                                    {
                                        customname : customName,
                                    },{
                                        customname : customName,
                                        $push : {
                                            images : image 
                                        }
                                    },{
                                        upsert:true
                                    }
                                )

                        }
                        message.react('✅')
                    
                    } else {
                      
                        await customEmbed.findOneAndUpdate(
                            {
                                customname : customName,
                            },{
                                customname : customName,
                                $push : {
                                    images : image 
                                }
                            },{
                                upsert:true
                            }
                        )

                        message.react('✅')
                        
                    }
                } 
                   
                
            } catch(e) {
                console.log(e)

            } finally {
                mongoose.connection.close()
            }
            
        })

    
	}
});
