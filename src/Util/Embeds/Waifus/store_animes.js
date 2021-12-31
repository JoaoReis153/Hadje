const config = require('../../../Data/config.json')
const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}storeanimes <anilist username> <@user>**`)
	.setColor(color.syntax)

    return syntax
}

module.exports.confirmationResponse = () => {
    const confirmation = new Discord.MessageEmbed()
	.setDescription("✅ Wish removed")
	.setColor(color.confirmation)

    return confirmation
}
module.exports.nowishesResponse = anime => {
    const nowishes = new Discord.MessageEmbed()
    .setDescription("No one wishes `" +  anime + "`")
    .setColor(color.confirmation)

    return nowishes
}

module.exports.tryagainResponse = () => {
    const tryagain = new Discord.MessageEmbed()
    .setDescription('Please try again')
    .setColor(color.error)

    return tryagain
}

module.exports.errorResponse = () => {
    const error = new Discord.MessageEmbed()
    .setDescription('There was an error')
    .setColor(color.error)

    return error
}