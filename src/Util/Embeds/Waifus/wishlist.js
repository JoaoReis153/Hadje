const config = require('../../../Data/config.json')
const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.nowishesResponse = () => {
    const confirmation = new Discord.MessageEmbed()
	.setDescription("No wishes found")
	.setColor(color.confirmation)

    return confirmation
}