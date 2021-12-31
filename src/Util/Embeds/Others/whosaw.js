const config = require('../../../Data/config.json')
const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}whosaw <anime>**`)
	.setColor(color.syntax)

    return syntax
}

module.exports.confirmationResponse = () => {
    const confirmation = new Discord.MessageEmbed()
	.setDescription("✅ Wish removed")
	.setColor(color.confirmation)

    return confirmation
}
module.exports.noonesawResponse = anime => {
    const noonesaw = new Discord.MessageEmbed()
    .setDescription("No one saw `" +  anime + "`")
    .setColor(color.confirmation)

    return noonesaw
}


module.exports.errorResponse = () => {
    const error = new Discord.MessageEmbed()
    .setDescription('There was an error')
    .setColor(color.error)

    return error
}