const config = require('../../../Data/config.json')
const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}warnlist <user>**`)
	.setColor(color.syntax)

    return syntax
}

module.exports.nodataFound = tag => {
    const nodata = new Discord.MessageEmbed()
    .setDescription(`**${tag}** has no warnings`)
    .setColor(color.nodata)

    return nodata
}