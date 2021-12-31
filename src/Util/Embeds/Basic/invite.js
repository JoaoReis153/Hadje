const Discord = require('discord.js');

const color = require('../../../Data/colors.json')


module.exports.formatResponse = url => {
    const invite_embed = new Discord.MessageEmbed()
    .setTitle("Invite me here")
    .setURL(url)
	.setColor(color.invite)

	return invite_embed;
	
};

