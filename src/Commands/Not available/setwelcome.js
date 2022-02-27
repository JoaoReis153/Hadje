const mongo = require('../../Database/index.js')

const color = require('../../Data/colors.json')

const Command = require("../../Structures/Command.js");

const welcomeSchema = require('../../Schemas/welcome-schema');

const prefixSchema = require('../../Schemas/guild-prefixes')

const Discord = require('discord.js')

const config = require('../../Data/config.json')

var prefix

module.exports = new Command({
	name: "setwelcome",
  aliases: ['welcome', 'changewelcome', 'welcomeset'],
	description: "Set welcome message",
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

        let text = message.content
          
        const split = text.split(' ')

        if (split.length < 2) {
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
          .setDescription(`Syntax: **${prefix}setwelcome  <message>**`)
          .setColor(color.syntax)

          return message.channel.send({embeds:[syntax_error]});
        }

        split.shift()
        text = split.join(' ')

        const message_type_not_accepted  = new Discord.MessageEmbed()
          message_type_not_accepted
                .setDescription(`Such welcome message cannot be set`)
                .setColor(color.error)


          if (text.includes('```')) return message.channel.send({embeds : [message_type_not_accepted]})
        
        await mongo().then(async (mongoose) => {
          try {
            await welcomeSchema.findOneAndUpdate(
              {
                _id: message.guild.id,
              },
              {
                _id: message.guild.id,
                channelId: message.channel.id,
                text,
              },
              {
                upsert: true,
              }
            )
          } finally {
            mongoose.connection.close()
          }
        })

        
     
        const welcomeupdated  = new Discord.MessageEmbed()
            .setDescription(`Welcome Updated to "${text.replace(/<@>/g, `<@${message.author.id}>`)}"`)
            .setColor(color.updated)
				
		message.channel.send({embeds : [welcomeupdated]})

      }
    }
);

