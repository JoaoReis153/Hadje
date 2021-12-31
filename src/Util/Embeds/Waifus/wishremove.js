const config = require('../../../Data/config.json')
const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}wishremove <anime/wishlist num>**`)
	.setColor(color.syntax)

    return syntax
}

module.exports.confirmationResponse = () => {
    const confirmation = new Discord.MessageEmbed()
	.setDescription("✅ Wish removed")
	.setColor(color.confirmation)

    return confirmation
}