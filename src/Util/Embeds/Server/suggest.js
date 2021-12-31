const config = require('../../../Data/config.json')
const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}suggest <suggestion>**`)
	.setColor(color.syntax)

    return syntax
}

module.exports.suggestionResponse = (author_id, suggestion )=> {
    const suggestion_embed = new Discord.MessageEmbed()
   // .setAuthor(author_username, author_avatar)
    .setDescription(`Suggested by  <@${author_id}>:\n\n` + '-> ' + suggestion)
    .setColor(color.suggestion)

    return suggestion_embed
}

module.exports.thankyouResponse = author_id => {
    const thankyou = new Discord.MessageEmbed()
    .setDescription(`**Thank you <@${author_id}>**`)
    .setColor(color.thankyouforsuggestion)

    return thankyou
}