const Discord = require('discord.js');

const color = require('../../../Data/colors.json')


module.exports.formatResponse = ({ quote, character, anime }) => {
	quote = quote.replace(/\\|\//g, '');
	// inside a command, event listener, etc.
	const quoteEmbed = new Discord.MessageEmbed()
		.setAuthor(`${character} (${anime})`)
		.setColor(color.quote)
		.setDescription(`*${quote}*`)

	return quoteEmbed;
	
};

module.exports.errorResponse = string => {
	const errorEmbed = new Discord.MessageEmbed()
		.setColor(color.quoteErrorResponse)
		.setDescription(string);
		
	return errorEmbed;
};

module.exports.syntaxResponse = prefix => {
	const syntax_embed = new Discord.MessageEmbed()
	.setDescription(`Syntax:\n--> **${prefix}quote anime <anime>**\n\n--> **${prefix}quote char <character>**\n`)
	.setColor(color.syntax)

	return syntax_embed
}
