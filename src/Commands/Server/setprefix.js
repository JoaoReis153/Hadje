/** @format */

const Command = require("../../Structures/Command.js");

const color = require('../../Data/colors.json')

const prefixSchema = require('../../Schemas/prefix-schema.js');

const mongo = require("../../Database/index.js");

const Discord = require('discord.js')

const config = require('../../Data/config.json')

var prefix

module.exports = new Command({
	name: "setprefix",
	aliases: ['prefix', 'changeprefix', 'prefixset'],
	description: "sets a prefix",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

		const not_owner = new Discord.MessageEmbed();
          not_owner
            .setTitle("🛠️   Missing Permission   🛠️")
            .setDescription(`\u200b
                    ➤ Permission(s) missing:
                    ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤ
                    ☐ Owner Role`)
            .setColor(color.missing_permissions)
            .setThumbnail(message.author.avatarURL({ dynamic: true }))


        if (message.author.id != message.guild.ownerId) return message.channel.send({embeds:[not_owner]}); 

		prefix = args[1]

		if (!prefix) {
			await mongo().then(async (mongoose) => {
                try {
                    const data = await prefixSchema.findOne({ _id : message.guild.id})
                    if (!data) {
                        prefix = config.prefix
                    } else {
                        prefix = data.prefix
                    }		
                } finally {
                    mongoose.connection.close()
                }    
            })
			const syntax_error = new Discord.MessageEmbed()
			.setDescription(`Syntax: **${prefix}setprefix  <prefix>**`)
			.setColor(color.syntax)

			return message.channel.send({embeds:[syntax_error]});
		} 

		const prefix_too_long = new Discord.MessageEmbed()
			prefix_too_long
				.setDescription('Maximum prefix characters: 4')
				.setColor(color.error)

		if (prefix.length > 4) return message.channel.send({embeds : [prefix_too_long]})

		await mongo().then(async (mongoose) => {
			try {
				await prefixSchema.findOneAndUpdate (
					{
						_id: message.guild.id,
					  },
					  {
						_id: message.guild.id,
						prefix,
					  },
					  {
						upsert: true,
					  }
				)

			} finally {
				mongoose.connection.close()
			}
		})
	


		const prefixupdated  = new Discord.MessageEmbed()
			prefixupdated
				.setDescription(`Prefix Updated to  **${prefix}**`)
				.setColor(color.updated)
		
		message.channel.send({embeds : [prefixupdated]})	
		
	}
});

