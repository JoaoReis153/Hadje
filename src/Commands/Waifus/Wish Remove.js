/** @format */

const Command = require("../../Structures/Command.js");

const config = require('../../Data/config.json')

const Discord = require('discord.js')

const prefixSchema = require('../../Schemas/guild-prefixes')

const color = require('../../Data/colors.json')

const { nowishesResponse, syntaxResponse } = require('../../Util/Embeds/Waifus/wishremove')

const wishanimeSchema = require('../../Schemas/wishanime')

const mongo = require('../../Database/index');

module.exports = new Command({
	name: "wishremove",
	aliases: ['wr', 'wremove'],
	description: "YOHOHO",
	permission: "SEND_MESSAGES",
	botpermission: "ADD_REACTIONS",
	async run(message, args, client) {

        const anime_name = args.slice(1).join(' ')

        if (!anime_name) {
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

        if (!isNaN(anime_name)) {
            const data = await wishanimeSchema.find({guildId : message.guild.id})
            if (!data) {return}

            let anime_list = []

            for (const object in data) {
                for (const user in data[object].users) {
                    if (data[object].users[user] === message.author.id) {
                        anime_list.push(data[object].anime)
                    }
                }
            }
            let num = parseInt(anime_name)-1

            await wishanimeSchema.updateMany({guildId : message.guild.id, anime: anime_list[num]}, { $pull: { 'users' : message.author.id}})

            return message.react('✅')
        }


        const title = anime_name.toLowerCase()


        await mongo().then(async (mongoose) => {
            try {
                await wishanimeSchema.updateMany({guildId : message.guild.id, anime: title}, { $pull: { 'users' : message.author.id}})
           
                message.react('✅')
                
            } catch(e) {
                console.log(e)
            }finally {
                mongoose.connection.close()
            }
        })
    }
});
