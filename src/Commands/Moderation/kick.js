/** @format */

const { syntaxResponse, notkickableResponse, confirmationeditedResponse, confirmationwithouthreasonResponse, confirmationwithreasonResponse, kickrevokedResponse, userkickedResponse  } = require('../../Util/Embeds/Moderation//kick')

const Command = require('../../Structures/Command')

const color = require('../../Data/colors.json')

const prefixSchema = require('../../Schemas/prefix-schema')

const Discord = require('discord.js')

const mongo = require('../../Database/index')

const emoji = require('../../Data/emojis.json')

const config = require('../../Data/config.json')

module.exports = new Command({
    name: "kick",
    description: "Kicks a member",
    permission: "KICK_MEMBERS",
	botpermission: 'KICK_MEMBERS',
    async run(message, args, client) {

        const author_username = message.author.username
        const author_avatar = message.author.avatarURL({ dynamic: true })

        const yes = '✅'
        const no =  '⛔'

        let reason = args.slice(2).join(' ')

        let user = message.mentions.members.first()

        if (!user) {
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
            const syntax_error = new Discord.MessageEmbed()
			.setDescription(`Syntax: **${prefix}kick <user> optional:< reason>**`)
			.setColor(color.syntax)

			return message.channel.send({embeds:[syntaxResponse(prefix)]});
        }

        if(!user.kickable) return message.channel.send({embeds:[notkickableResponse()]})

        if(reason[0] === undefined ) {

            const msg = await message.channel.send({embeds: [confirmationwithouthreasonResponse(user, author_username, author_avatar)]})

            msg.react(yes).then(() => msg.react(no))

            const filter = (reaction, user) => {
                return [yes, no].includes(reaction.emoji.name) && user.id === message.author.id
            } 
            
            msg
                .awaitReactions({ filter, max:1, time: 15000, errors: ['time']})
                .then(col => {
                    const react = col.first()

                    if (react.emoji.name === no) {

                        msg.reactions.removeAll().catch()
                        msg.edit({embeds : [kickrevokedResponse()]})
                
                    } else if (react.emoji.name === yes) {
   
                        user.kick()
                        msg.reactions.removeAll().catch()
                        msg.edit({ embeds : [ userkickedResponse(user) ]})
                         
                    } else return 
                })
                .catch(col => {
                    msg.reactions.removeAll().catch()
                    msg.edit({embeds : [ confirmationeditedResponse() ]})
                }) 
        }
        
        
        
        else if (reason[0] !== undefined){

            const msg = await message.channel.send({embeds: [confirmationwithreasonResponse(user, reason)]})

            msg.react(yes).then(() => msg.react(no))

            const filter = (reaction, user) => {
                return [yes, no].includes(reaction.emoji.name) && user.id === message.author.id
            } 
        
            msg
                .awaitReactions({ filter, max:1, time: 15000, errors: ['time']})
                .then(col => {
                    const react = col.first()

                    if (react.emoji.name === no) {

                        msg.reactions.removeAll().catch()
                        msg.edit({embeds : [ kickrevokedResponse() ]})
                
                    } else if (react.emoji.name === yes) {
        
                            user.kick(reason)
                            msg.reactions.removeAll().catch()
                            msg.edit({ embeds : [ userkickedResponse(user) ]})
                         
                    } else return
                })
                .catch(col => {
                    msg.reactions.removeAll().catch()
                    msg.edit({embeds : [ confirmationeditedResponse() ]})
                }) 
            
            
            } else return
    }
          
});