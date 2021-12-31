/** @format */

const Discord = require('discord.js')

const config = require('../../Data/config.json')

const mongo = require('../../Database/index')

const wishanimeSchema = require('../../Schemas/wishanime')

const Command = require("../../Structures/Command.js");

module.exports = new Command({
	name: "deleteclear",
	description: "Shows the ping of the bot!",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
		if (message.author.id != config.my_id) return; 
		await mongo().then(async (mongoose) => {
            try {
                const data = await wishanimeSchema.find()
                

                for (const obj of data) {
                    let title = obj.anime
                    if(obj.users.length === 0 ) {
                        await wishanimeSchema.deleteMany({guildId : message.guild.id, anime: title})
                    }
                }
           
                message.react('✅')
                
            } catch(e) {
                console.log(e)
            }finally {
                mongoose.connection.close()
            }
        })
    }
});
