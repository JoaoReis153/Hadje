const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}ban <@user> optional: <reason>**`)
	.setColor(color.syntax)

    return syntax
} 

module.exports.notbannableResponse = () => {
    const not_bannable = new Discord.MessageEmbed()
    .setDescription(`I cannot ban that user`)
    .setColor(color.not_bannable)

    return not_bannable
}
 
module.exports.confirmationeditedResponse = () => {
    const confirmation_edited = new Discord.MessageEmbed()
    .setDescription('Message no longer available')
    .setColor(color.confirmation_edited)

    return confirmation_edited
}

module.exports.confirmationwithouthreasonResponse = (user, author_username, author_avatar) => {
    const confirmation_without_reason = new Discord.MessageEmbed()
    .setAuthor(author_username, author_avatar)
    .setDescription(`Are you sure you want to ban the user:\n${user}`)
    .setColor(color.confirmation)

    return confirmation_without_reason
}

module.exports.confirmationwithreasonResponse = (user, reason) => {
    const confirmation_with_reason = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setDescription(`Are you sure you want to ban the user: ${user}\n
                    **Reason:**
                    -> ${reason}`)

    .setColor(color.confirmation)

    return confirmation_with_reason
}

module.exports.banrevokedResponse = () => {
    const ban_revoked = new Discord.MessageEmbed()
    .setDescription('Ban revoked with success')
    .setColor(color.revoked)

    return ban_revoked
}

module.exports.userbannedResponse = user => {
    const user_banned = new Discord.MessageEmbed()
    .setDescription(`${user} banned with success`)
    .setColor(color.user_banned)

    return user_banned
}
