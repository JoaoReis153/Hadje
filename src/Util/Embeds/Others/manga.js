const Discord = require('discord.js');

const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
	const syntax_embed = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}manga <manga>**`)
	.setColor(color.syntax)

	return syntax_embed
}

module.exports.formatResponse = (title_english, url, description, status, genres,date,chapters, volumes, averageScore, thumbnail,color) => {
    const aninfo = new Discord.MessageEmbed()
    .setTitle(title_english)
    .setURL(url)
    .setDescription(description)
    //.setColor(color.aninfo)
    .setColor(color)
    .setThumbnail(thumbnail)
    .addFields(
        {
            name: "⏳ Status",
            value: status,
            inline: false
        },
        {
            name: "➡️ Genres",
            value: genres,
            inline: false
        },
        {
            name: "📅 Aired",
            value: date,
            inline : false
        },
        {
            name : "📰 Chapters",
            value: chapters,
            inline: true
        },
        {
            name: "📚 Volumes",
            value: `${volumes}`,
            inline: true
        },
        {
            name: "⭐ Average Score",
            value: `**${averageScore}/100**`,
            inline: true
        }
    )
    
    return aninfo
}