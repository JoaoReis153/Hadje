/** @format */

const Command = require('../../Structures/Command')

const color = require('../../Data/colors.json')

const Discord = require('discord.js')

const moment = require('moment')

const {prefix} = require('../../Data/config.json')

module.exports = new Command({
    name: "user-info",
    aliases: ['userinfo', 'infouser'],
    description: "Gives info about a user",
    permission: 'ADMINISTRATOR',
	botpermission: "SEND_MESSAGES",
    async run(message, args, client) {
    
        function capitalizeFirstLetter(array) {
            array = array.map( f => { return f.toLowerCase(); });
            const new_array = []
            for (let i = 0; i<array.length; i++) {
                let element = array[i].charAt(0).toUpperCase() + array[i].slice(1);
                new_array.push(element)
            }
            return new_array

        }

        const user = message.mentions.members.first() || message.author || message.member
        const member = message.guild.members.cache.get(user.id)

        const joinedDiscord = moment(user.createdAt).format('llll')
        const joinedServer = moment(member.joinedAt).format('llll')
        const username = member.user.username
        const tag = member.user.tag
        const Id = member.id
        const permissions = member.permissions.toArray()

        let userinfo = new Discord.MessageEmbed
            userinfo
                .setAuthor(`${message.author.tag} | ${message.author.id}`, message.author.avatarURL({ dynamic: true }))
                .setThumbnail(member.user.avatarURL({ dynamic: true }))
                //.setFooter(`Requested by ${message.author.tag} | ${message.author.id}`)
                .setColor(color.user_info)
                .addFields(
                    {
                        name: "\u200B\nUser: ",
                        value: tag + ' | ' + Id,
                        inline: false
                    },
                    {
                        name: '\u200B\nRoles:',
                        value: member.roles ? member.roles.cache.map(r => `${r}`).join(' | ') : "",
                        inline: false
                    },
                    {
                        name: "\u200B\nJoined Discord:",
                        value: joinedDiscord,
                        inline:  true
                    },
                    {
                        name: "\u200B\nJoined Server",
                        value: joinedServer,
                        inline: true
                    },
                    {
                        name: "\u200B\nPermissions:",
                        value: capitalizeFirstLetter(permissions).join('  |  '),
                        inline: false
                    }
                );
                
        
        message.channel.send({embeds : [userinfo] })
            
    }
})