const Discord = require('discord.js')

const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const prefix_embed = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}op.gg  <username>**`)
	.setColor(color.syntax)

	return prefix_embed;
};

module.exports.regionResponse = ( url_region, user) => {
    const region_found = new Discord.MessageEmbed()
	.setTitle(`⚡️ ${user}`)			
	.setDescription(`
					Link → [OP.GG](https://${url_region}/summoner/userName=${user})`)
	.setColor(color.region_found)
	
	return region_found
};

module.exports.regionerrorResponse = () => {
	const region_notfound = new Discord.MessageEmbed()
		.setTitle(`Available Regions`)	
		.setColor(color.lol_theme)		
		.addFields(
			{
				name: "Europe",
				value: "Europe, EUW",
				inline: true
			},
			{
				name: "North America",
				value: "North America, NA",
				inline: false
			},
			{
				name: "Korea",
				value: "Korea, KR",
				inline: true
			},
			{
				name: "Brazil",
				value: "Brazil, BR",
				inline: true
			},
		)

	return region_notfound
}