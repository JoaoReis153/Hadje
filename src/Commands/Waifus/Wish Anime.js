/** @format */

const Command = require("../../Structures/command.js");

const config = require('../../Data/config.json')

const { syntaxResponse, confirmationResponse } = require('../../Util/Embeds/Waifus/wishanime')

const prefixSchema = require('../../Schemas/guild-prefixes')

const wishanimeSchema = require('../../Schemas/wishanime')

const mongo = require('../../Database/index');

module.exports = new Command({
	name: "wishanime",
	aliases: ['wa', 'wanime', 'wish'],
	description: "YOHOHO",
	permission: "SEND_MESSAGES",
	botpermission: "ADD_REACTIONS",
	async run(message, args, client) {

        const anime_name = args.slice(1).join(' ').toLowerCase()

            if (!anime_name) {
                await mongo().then(async (mongoose) => {
                    try {
                        const result = await prefixSchema.findOne({ _id : message.guild.id})
                        if (!result) {
                            prefix = config.prefix
                        } else {
                            prefix = result.prefix
                        }		
                    } finally {
                        mongoose.connection.close()
                    }    
                })
                
                return message.channel.send({embeds:[syntaxResponse(prefix)]});
            }

        if(anime_name.includes('$$'))  { 
            await mongo().then(async (mongoose) => {
                try {

                    const lista = anime_name.split('$$')
                    const anime_lista = []

                    for (const name of lista) {

                    
                        const title = name.toLowerCase()

                        const dat = await wishanimeSchema.find({ guildId : message.guild.id})

                        if (!dat || dat[0] === undefined) {
                            await wishanimeSchema.insertMany([ {guildId: message.guild.id, anime: title, users: [message.author.id]}]) 
                        }

                        for (const object of dat) {
                            anime_lista.push(object.anime)
                        } 
                        if (anime_lista.includes(title)) {
                            let dat1 = await wishanimeSchema.find({ guildId : message.guild.id, anime: title})
                            dat1 = dat1[0]
                                
                            if(!dat1.users.includes(message.author.id) ) {
                                await wishanimeSchema.updateOne({ guildId : message.guild.id, anime : title}, {$push: {users: message.author.id}})
                            }
                        } else {
                            await wishanimeSchema.insertMany([ {guildId: message.guild.id, anime: title,  users: [message.author.id]}])
                        }

                    }
                               
                    } catch(e) {
                        console.log(e)
                    }finally {
                        mongoose.connection.close()
                    }
                })
            return message.react('✅') 
        }

      const title = anime_name.toLowerCase()

        await mongo().then(async (mongoose) => {
            try {
                const data2 = await wishanimeSchema.find({ guildId : message.guild.id})
        
                if (!data2|| data2[0] === undefined) {
                    await wishanimeSchema.insertMany([ {guildId: message.guild.id, anime: title, users: [message.author.id]}])
                    return message.react('✅')                              
                }

                let animes_lista = []

                if (!data2 || data2[0] === undefined) {
                    await wishanimeSchema.insertMany([ {guildId: message.guild.id, anime: title, users: [message.author.id]}]) 
                }

                for (const object of data2) {
                    animes_lista.push(object.anime)
                } 

                if (animes_lista.includes(title)) {
                    let data3 = await wishanimeSchema.find({ guildId : message.guild.id, anime: title})
                    data3 = data3[0]
                        
                    if(!data3.users.includes(message.author.id) ) {
                        await wishanimeSchema.updateOne({ guildId : message.guild.id, anime : title}, {$push: {users: message.author.id}})
                    }
                } else {
                    await wishanimeSchema.insertMany([ {guildId: message.guild.id, anime: title,  users: [message.author.id]}])
                }
                            
                
                return message.react('✅') 
                    
            } catch(e) {
                console.log(e)
            }finally {
                mongoose.connection.close()
            }
        })  
    }
})

