/** @format */

const Command = require('../../Structures/Command')

const color = require('../../Data/colors.json')

const config = require('../../Data/config.json')

const mongo = require('../../Database/index')

const Discord = require('discord.js')

const { syntaxResponse, notbannableResponse, confirmationeditedResponse, confirmationwithouthreasonResponse, confirmationwithreasonResponse, banrevokedResponse, userbannedResponse  } = require('../../Util/Embeds/Moderation/ban')

const emoji = require('../../Data/emojis.json')

const prefixSchema = require('../../Schemas/prefix-schema')

var prefix

module.exports = new Command({
    name: "ban",
    description: "Bans a member",
    permission: 'BAN_MEMBERS',
	botpermission: "BAN_MEMBERS",
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
            
			return message.channel.send({embeds:[syntaxResponse(prefix)]});
        }
        

        if(!user.bannable) return message.channel.send({embeds:[notbannableResponse()]})

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
                        msg.edit({embeds : [banrevokedResponse()]})
                
                    } else if (react.emoji.name === yes) {

                        user.ban()
                        msg.reactions.removeAll().catch()
                        msg.edit({ embeds : [ userbannedResponse(user) ]})
                         
                    } else return 
                })
                .catch(col => {
                    msg.reactions.removeAll().catch()
                    msg.edit({embeds : [ confirmationeditedResponse() ]})
                }) 
        }
        
        
        
        else if (reason[0] !== undefined){

            const msg = await message.channel.send({embeds: [ confirmationwithreasonResponse(user, reason)]})

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
                        msg.edit({embeds : [ banrevokedResponse() ]})
                
                    } else if (react.emoji.name === yes) {

                            user.ban({reason: reason})
                            msg.reactions.removeAll().catch()
                            msg.edit({ embeds : [ userbannedResponse(user) ]})
                         
                    } else return
                })
                .catch(col => {
                    msg.reactions.removeAll().catch()
                    msg.edit({embeds : [ confirmationeditedResponse() ]})
                }) 
            
            
            } else return
    }
          
});