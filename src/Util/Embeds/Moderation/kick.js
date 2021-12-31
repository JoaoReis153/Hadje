const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}kick <@user> optional: <reason>**`)
	.setColor(color.syntax)

    return syntax
} 

module.exports.notkickableResponse = () => {
    const not_kickable = new Discord.MessageEmbed()
    .setDescription(`I cannot kick that user`)
    .setColor(color.not_kickable)

    return not_kickable
}
 
module.exports.confirmationeditedResponse = () => {
    const confirmation_edited = new Discord.MessageEmbed()
    .setDescription('Message not longer available')
    .setColor(color.confirmation_edited)

    return confirmation_edited
}

module.exports.confirmationwithouthreasonResponse = (user, author_username, author_avatar) => {
    const confirmation_without_reason = new Discord.MessageEmbed()
    .setAuthor(author_username, author_avatar)
    .setDescription(`Are you sure you want to kick the user:\n${user}`)
    .setColor(color.confirmation)

    return confirmation_without_reason
}

module.exports.confirmationwithreasonResponse = (user, reason) => {
    const confirmation_with_reason = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setDescription(`Are you sure you want to kick the user: ${user}\n
                    **Reason:**
                    -> ${reason}`)

    .setColor(color.confirmation)

    return confirmation_with_reason
}

module.exports.kickrevokedResponse = () => {
    const kick_revoked = new Discord.MessageEmbed()
    .setDescription('Kick revoked with success')
    .setColor(color.revoked)

    return kick_revoked
}

module.exports.userkickedResponse = user => {
    const user_kicked = new Discord.MessageEmbed()
    .setDescription(`${user} kicked with success`)
    .setColor(color.user_kicked)

    return user_kicked
}
