const config = require('../../../Data/config.json')
const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}wishanime <anime>**`)
	.setColor(color.syntax)

    return syntax
}

module.exports.confirmationResponse = anime => {
    const confirmation = new Discord.MessageEmbed()
	.setDescription("`" + anime + "` is now part of your wishlist")
	.setColor(color.confirmation)

    return confirmation
}