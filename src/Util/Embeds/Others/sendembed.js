const Discord = require('discord.js');

const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const prefix_embed = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}sendembed <author> | <quote> **`)
	.setColor(color.syntax)

	return prefix_embed;
};