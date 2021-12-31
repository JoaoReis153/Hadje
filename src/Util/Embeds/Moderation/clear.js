const Discord = require('discord.js') 
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
    .setDescription(`Syntax: **${prefix}clear  <ammount>**`)
    .setColor(color.syntax)

    return syntax
}

module.exports.cannotclearResponse = () => {
    const cannot_clear = new Discord.MessageEmbed()
    .setDescription("You cannot clear more than 100 messages!")
    .setColor(color.cannot_clear)

    return cannot_clear
}

module.exports.messagesclearedResponse = (size, emoji) => {
    const messages_cleared = new Discord.MessageEmbed()
	.setDescription(`${emoji} Cleared ${size} messages!`)
	.setColor(color.message_cleared)

    return messages_cleared
}