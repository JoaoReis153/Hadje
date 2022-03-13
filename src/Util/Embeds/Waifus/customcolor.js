const config = require('../../../Data/config.json')
const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}imcolor <name>$ <Color> **
    Replace <Color> by the corresponding HEX code (https://www.google.com/search?q=color+picker)`)
	.setColor(color.syntax)

    return syntax
}


module.exports.imgurError = () => {
    const imgurerror = new Discord.MessageEmbed()
	.setDescription(`The image has to be from **imgur.com**`)
	.setColor(color.syntax)

    return imgurerror
}

module.exports.galleryError = () => {
    const imgurerror = new Discord.MessageEmbed()
	.setDescription(`Don't link an album: right click on the image to get the correct link`)
	.setColor(color.syntax)

    return imgurerror
}