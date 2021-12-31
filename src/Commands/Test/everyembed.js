/** @format */

const Command = require("../../Structures/Command.js");

const color = require('../../Data/colors.json')

const Discord = require("discord.js");

module.exports = new Command({
	name: "everyembed",
    aliases: ["eembed"],
	description: "Shows an embed",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

console.log('Sending embeds')

        const author = message.author

        const invite_embed = new Discord.MessageEmbed();
            invite_embed
                .setTitle("Invite me here")
                .setColor(color.invite)
                .setURL("https://discord.com/oauth2/authorize?client_id=887373180036079636&permissions=8&scope=bot")

console.log('invite_embed sent')

       

console.log('userinfo sent ')

        const champe = new Discord.MessageEmbed();
            champe
                .setTitle(`**Evelynn**\u200B`)
                .setURL(`https://leagueoflegends.fandom.com/wiki/evelynn/LoL`)
                .setAuthor(``)
                .setColor(color.lol_theme)
                .setThumbnail(`https://fastcdn.mobalytics.gg/assets/lol/images/dd/champions/icons/evelynn.png`)
                .setFooter(`Version 11.19.1`)
                .addFields(
                    {
                        name: `Type:`,
                        value: `Assassin, Mage`,
                        inline: false
                    },
                    {
                        name: "Agony's Embrace",
                        value: `Within the dark seams of Runeterra, the demon Evelynn searches for her next victim. She lures in prey with the voluptuous façade of a human female, but once a person succumbs to her charms, Evelynn's true form is unleashed. She then subjects her victim...`,
                        inline: false
                    }
                );

console.log('champe sent')

        const region_notfound = new Discord.MessageEmbed();
            region_notfound
                .setTitle(`Available Regions`)	
                .setColor(color.lol_theme)		
                .addFields(
                    {
                        name: "Europe",
                        value: "Europe, EUW",
                        inline: false
                    },
                    {
                        name: "North America",
                        value: "North America, NA",
                        inline: false
                    },
                    {
                        name: "Korea",
                        value: "Korea, KR",
                        inline: false
                    },
                    {
                        name: "Brazil",
                        value: "Brazil, BR",
                        inline: false
                    },{
                        name: "Oceania",
                        value: "Oceania, OCE",
                        inline: false
                    },
                )

 console.log('region_not_found sent')

        const region_found = new Discord.MessageEmbed();
            region_found
                .setTitle(`⚡️ zomba3000`)			
                .setDescription(`
                                Link → [OP.GG](https://euw.op.gg/summoner/userName=zomba3000)`)
                .setColor(color.lol_theme)

console.log('region_found sent')

        const help = new Discord.MessageEmbed();
            help
                .setAuthor(
                    `${client.user.username} ・ Help` ,
                    client.user.avatarURL({ dynamic: true })
                )
                .setTitle('\u200B','\u200B')
                .setColor(color.help)
                .addFields(
                    {
                        name: "__LEAGUE OF LEGENDS__",
                        value: "**champ**: Gives some info about the mentioned champion \n**op.gg**: Gets the link to the op.gg of the username\n\u200B\n\u200B",
                        inline: false
                    },
                    {
                        name: "__SERVER__",
                        value: "(owner commands)\n**setprefix**: Change the command prefix \n**setwelcome**: Create/Change a welcome message\n\n\u200B\n\u200B",
                        inline: false
                    },
                );
                
console.log('help sent')

        const not_owner = new Discord.MessageEmbed();
            not_owner
                .setTitle("🛠️   Missing Permission   🛠️")
                .setDescription(`\u200b
                        ➤ Permission(s) missing:
                        ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤ
                        ☐ Owner Role`)
                .setColor(color.missing_permissions)
                .setThumbnail(message.author.avatarURL({ dynamic: true }))

console.log('not_owner sent')

        const not_valid_command  = new Discord.MessageEmbed
            not_valid_command
                .setDescription(`batata is not a valid command!`)
                .setColor(color.command_not_valid)

console.log('not_valid_command sent')

        const Client_missing_permissions = new Discord.MessageEmbed();
            Client_missing_permissions 
                .setTitle("🛠️   Missing Permission   🛠️")
                .setDescription(`\u200b
                                ➤ Permission(s) missing:
                                ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤ
                                ☐ Manage Messages`)
                .setColor(color.missing_permissions)
                .setThumbnail(client.user.avatarURL({ dynamic: true }))

console.log('Client_missing_permissions sent')

        const User_missing_permissions = new Discord.MessageEmbed();
            User_missing_permissions
                .setTitle("🛠️   Missing Permission   🛠️")
                .setDescription(`\u200b
                                ➤ Permission(s) missing:
                                ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤ
                                ☐ Manage Messages`)
                .setColor(color.missing_permissions)
                .setThumbnail(message.author.avatarURL({ dynamic: true }))

console.log('User_missing_permissions sent') 

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
                .setColor("WHITE")
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

        const prefixupdated  = new Discord.MessageEmbed()
			prefixupdated
				.setDescription(`Prefix Updated to  **$**`)
				.setColor(color.updated)

        const welcomeupdated  = new Discord.MessageEmbed()
            welcomeupdated
                .setDescription(`Welcome Updated to "Buenos dias <@${message.author.id}>"`)
                .setColor(color.updated)
                

        const message_type_not_accepted  = new Discord.MessageEmbed()
            message_type_not_accepted
                    .setDescription(`Such welcome message cannot be set`)
                    .setColor(color.welcome_message_not_accepted)

		message.channel.send('---------------BASIC----------------------------')
        message.channel.send({ embeds: [invite_embed] })
        message.channel.send('---------------LOL----------------------------')
        message.channel.send({ embeds: [champe,region_notfound,region_found] })
        message.channel.send('---------------SERVER----------------------------')
        message.channel.send('--> HELP')
        message.channel.send({ embeds: [help] })
        message.channel.send('--> PREFIX')
        message.channel.send({embeds : [prefixupdated,not_owner]})
        message.channel.send('--> WELCOME')
        message.channel.send({embeds : [welcomeupdated, message_type_not_accepted, not_owner]})
        message.channel.send('---------------TEST----------------------------')
        message.channel.send({ embeds: [embed] })
        message.channel.send('---------------EVENTS----------------------------')
        message.channel.send('--> CLIENT MISSING PERMS')
        message.channel.send({ embeds: [Client_missing_permissions] })
        message.channel.send('--> USER MISSING PERMS')
        message.channel.send({ embeds: [User_missing_permissions] })
        
        console.log('9')
	}
});
