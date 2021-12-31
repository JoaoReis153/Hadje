/** @format */

const Command = require("../../Structures/Command.js");

const color = require('../../Data/colors.json')

const Discord = require("discord.js");

module.exports = new Command({
	name: "embed",
	description: "Shows an embed",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
		const embed = new Discord.MessageEmbed();

		embed
			.setTitle("Can I see your panties? ")
			.setURL("https://c.tenor.com/GvNTFDy3-o8AAAAd/brook-one-piece-brook-panties.gif")
			.setAuthor(
				message.author.username,
				message.author.avatarURL({ dynamic: true }),
				"https://i.pinimg.com/originals/c1/33/a2/c133a29264f426ce9df77975dac42da6.jpg"
			)
			.setDescription(
				"First One Piece episode,\nHere is the link: [link](https://9anime.vc/watch/one-piece-100?ep=2142)"
			)
			.setColor(color.test_embed)
			.setThumbnail('https://i.pinimg.com/originals/c1/33/a2/c133a29264f426ce9df77975dac42da6.jpg')
			.setTimestamp()
			.setImage(
				"https://i.pinimg.com/originals/c1/33/a2/c133a29264f426ce9df77975dac42da6.jpg"
			)
			.addFields(
				{
					name: "Bot Version",
					value: "1.0.0",
					inline: true
				},
				{
					name: "Bot Name",
					value: client.user.username,
					inline: true
				}
			);

		message.channel.send({ embeds: [embed] });
	}
});
