/** @format */
//.
const Event = require("../Structures/Event.js");

const Discord = require('discord.js')

const mongo = require('../Database/index.js')

const config = require('../Data/config.json')

const color = require('../Data/colors.json')

const prefixSchema = require("../Schemas/guild-prefixes.js");

module.exports = new Event("guildCreate", async (client, guild) => {

    await mongo().then(async (mongoose) => {
		try {
			await prefixSchema.findOneAndUpdate(
                {
                    _id:  guild.id,
                },
                {
                    _id : guild.id,
                    prefix: '!'
                },
                {
                    upsert: true,
                }
            )
		} finally {
			mongoose.connection.close
		}
	})

    ownerId = client.users.cache.get(guild.ownerId)

    const new_server = new Discord.MessageEmbed()
    .setTitle('✅  Added to a new server')
    .setDescription(`Server name: **${guild.name}**
                    Server owner: **${ownerId}**
                    ID: **${guild.id}**`)
    .setImage(guild.iconURL({dynamic: true, size: 2048}))
    .setColor(color.guildCreated)

    client.channels.cache.get(config.channel_create_delete).send({embeds : [new_server]});
});