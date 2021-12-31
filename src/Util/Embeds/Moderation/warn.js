const config = require('../../../Data/config.json')
const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.syntaxResponse = prefix => {
    const syntax = new Discord.MessageEmbed()
	.setDescription(`Syntax: **${prefix}warn <@user> optional: <reason>**`)
	.setColor(color.syntax)

    return syntax
}

module.exports.confirmationResponse =  (tag,avatar,reason, author) => {
    const confirmation = new Discord.MessageEmbed()
    .setAuthor(`${tag} warned`, avatar)
    .addFields(
        {
            name: 'Author:',
            value: author 
        },
        {
            name: "Reason:",
            value: reason
        }
    )
    .setColor(color.warn_confirmation)



    return confirmation
}
