const Discord = require('discord.js');

const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
	const syntax_embed = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}setmessage <message id>**`)
	.setColor(color.syntax)

	return syntax_embed
}
