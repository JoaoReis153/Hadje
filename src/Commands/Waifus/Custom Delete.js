/** @format */

const Discord = require('discord.js')

const config = require('../../Data/config.json')

const customEmbed = require('../../Schemas/customembed')

const color = require('../../Data/colors.json')

const Command = require("../../Structures/command.js");

const mongo = require('../../Database/index');

const prefixSchema = require('../../Schemas/guild-prefixes')
 
const { ButtonPaginator } = require('@psibean/discord.js-pagination');

const {syntaxResponse} = require('../../Util/Embeds/Waifus/customshow')

var customName, images

var pages = []

module.exports = new Command({
	name: "imdelete",
	description: "Deletes every image of an embed",           
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

        if (message.author.id !== config.my_id) {
            const User_missing_permissions = new Discord.MessageEmbed()
                .setDescription(`**${message.author.username}**, you can't do that`)
                .setColor(color.missing_permissions)

		    return message.channel.send({ embeds: [User_missing_permissions] });
        }

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

                const data = await customEmbed.deleteOne({customname : customName})
                message.react('✅')
                                
            } catch(e) {
                console.log(e)
            } finally {
                mongoose.connection.close()
            }
        })


	}
});





