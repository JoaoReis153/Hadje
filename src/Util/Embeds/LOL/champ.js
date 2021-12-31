const Discord = require('discord.js')

const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const prefix_embed = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}champ  <champion>**`)
	.setColor(color.syntax)

	return prefix_embed;
};

module.exports.errorResponse = champ => {
    const error = new Discord.MessageEmbed()
    .setDescription(`Error: champion **${champ}** not found`)
    .setColor(color.champ_notfound)

    return error
}
