/** @format */

const Command = require("../../Structures/Command.js");

const config = require('../../Data/config.json')

const Discord = require('discord.js')

const color = require('../../Data/colors.json')

const { nowishesResponse } = require('../../Util/Embeds/Waifus/wishlist')

const wishanimeSchema = require('../../Schemas/wishanime')

const mongo = require('../../Database/index');

module.exports = new Command({
	name: "wishlist",
	aliases: ['wl', 'wlist'],
	description: "YOHOHO",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
        

            function capitalizeFL(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            const mentioned = message.mentions.members.first()           

            await mongo().then(async (mongoose) => {
                try {
                    const data = await wishanimeSchema.find({guildId : message.guild.id})

                    if (!data) {
                        return message.reply({ embeds : [nowishesResponse()]})
                    }


                    let animes_list = []

                    if(mentioned) {
                        for (const object in data) {
                            for (const user in data[object].users) {
                                if (data[object].users[user] === mentioned.user.id) {
                                    animes_list.push(data[object].anime)
                                }
                            }
                        }

                        const wishlist = new Discord.MessageEmbed()
                        .setAuthor(`${mentioned.user.username}'s wishlist`, mentioned.user.avatarURL({ dynamic: true }),)
                        .setColor(color.confirmation)

                    
                        let description = ''
                        for (const anime in animes_list) {
                            let numb = parseInt(anime)+1
                            description += `${numb}. **${capitalizeFL(animes_list[anime])}** \n`
                        }

                        wishlist.setDescription(description)

                        return message.channel.send({embeds : [wishlist]})

                        
                    } else {
                        for (const object in data) {
                            for (const user in data[object].users) {
                                if (data[object].users[user] === message.author.id) {
                                    animes_list.push(data[object].anime)
                                }
                            }
                        }
           
    
                        const wishlist = new Discord.MessageEmbed()
                            .setAuthor(`${message.author.username}'s wishlist`, message.author.avatarURL({ dynamic: true }),)
                            .setColor(color.confirmation)
    
                        
                        let description = ''
                        for (const anime in animes_list) {
                            let numb = parseInt(anime)+1
                            description += `${numb}. **${capitalizeFL(animes_list[anime])}** \n`
                        }
                        wishlist.setDescription(description)
    
                        return message.channel.send({embeds : [wishlist]})
                    }

                    

                } finally {mongoose.connection.close()}    
            })
        } 
});

//  return message.channel.send({embeds : [confirmationResponse(anime_name)] }) 