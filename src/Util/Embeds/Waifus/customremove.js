const config = require('../../../Data/config.json')
const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}imremove <name>$<number>**`)
	.setColor(color.syntax)

    return syntax
}


module.exports.doesnotexist = name => {
    const doesnotexist = new Discord.MessageEmbed()
	.setDescription(`The custom of **${name}** doesn't exist`)
	.setColor(color.syntax)

    return doesnotexist
}



