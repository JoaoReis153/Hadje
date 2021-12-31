const config = require('../../../Data/config.json')
const Discord = require('discord.js')
const color = require('../../../Data/colors.json')

module.exports.helpResponse =  (prefix, client_username, client_avatar) => {
    const help = new Discord.MessageEmbed()
    .setAuthor(
        `${client_username} ・ Help` ,
        client_avatar
    )
    .setColor(color.help)
    .addFields(
        {
            name: "Server",
            value: "`" + prefix + "help server`",
            inline: true
        },	
        {
            name: "Moderation",
            value: "`" + prefix + "help moderation`",
            inline: false
        },	
        {
            name: "League of Legends",
            value: "`" + prefix + "help lol`",
            inline: false
        },
        {
            name: "Waifus",
            value: "`" + prefix + "help waifus`",
            inline: false
        },
        {
            name: "Search",
            value: "`" + prefix + "help search`",
            inline: false
        }			
    );



    return help
}

module.exports.helpserverResponse =  (prefix, client_username, client_avatar) => {
    const helpserver = new Discord.MessageEmbed()
    .setAuthor(
        `${client_username} ・ Help Server` ,
        client_avatar
    )
    .setColor(color.help)
    .addFields(
        {
            name: "\u200b",
            value: "`" + prefix + "setprefix [prefix]`\nSets command prefix",
            inline: true
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "setwelcome [message]`\nSets welcome message",
            inline: false
        }		
    );



    return helpserver
}

module.exports.helpmoderationResponse =  (prefix, client_username, client_avatar) => {
    const helpmoderation = new Discord.MessageEmbed()
    .setAuthor(
        `${client_username} ・ Help Moderation` ,
        client_avatar
    )
    .setColor(color.help)
    .addFields(
        {
            name: "\u200b",
            value: "`" + prefix + "ban [user] (optional reason)`\nBans a user from the server",
            inline: true
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "kick [user] (optional reason)`\nKicks a user from the server",
            inline: false
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "clear [number]`\nClears a specific number of messages",
            inline: false
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "warn [user] (optional reason)`\nWarns a user",
            inline: false
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "warnlist [user]`\nShows the warn history of the user",
            inline: false
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "userinfo [user]`\nShows information about the user ",
            inline: false
        }
    );



    return helpmoderation
}

module.exports.helplolResponse =  (prefix, client_username, client_avatar) => {
    const helplol = new Discord.MessageEmbed()
    .setAuthor(
        `${client_username} ・ Help LOL` ,
        client_avatar
    )
    .setColor(color.help)
    .addFields(
        {
            name: "\u200b",
            value: "`" + prefix + "champ [champion]`\nShows the champ history and some other informations",
            inline: true
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "opgg [opgg name] (region)`\nShows the opgg of the specified user",
            inline: false
        }
    );



    return helplol
}


module.exports.helpwaifusResponse =  (prefix, client_username, client_avatar) => {
    const helpwaifus = new Discord.MessageEmbed()
    .setAuthor(
        `${client_username} ・ Help Waifus` ,
        client_avatar
    )
    .setColor(color.help)
    .addFields(
        {
            name: "\u200b",
            value: "`" + prefix + 'wishanime [anime]`\nAdds the specified anime to the wishlist, \nYou can use "$$" if its more than one anime\n(write the name as it is in the waifus)',
            inline: true
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "wishremove [anime / wishlist number]`\nRemoves the specified anime of the wishlist",
            inline: false
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "wishlist (optional user)`\nShows the wish list",
            inline: false
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "enabledm`\nI DM you every time there's someone from your wishlist or someone from Mudae's wishlist (you stop being tagged)",
            inline: false
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "disabledm`\nDisables the DMs",
            inline: false
        }
    );



    return helpwaifus
}


module.exports.helpsearchResponse =  (prefix, client_username, client_avatar) => {
    const helpsearch = new Discord.MessageEmbed()
    .setAuthor(
        `${client_username} ・ Help Search` ,
        client_avatar
    )
    .setColor(color.help)
    .addFields(
        {
            name: "\u200b",
            value: "`" + prefix + 'anime [anime]`\nGives information about the anime',
            inline: true
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "manga [manga]`\nGives information about the manga",
            inline: false
        },	
        {
            name: "\u200b",
            value: "`" + prefix + "quote`\n" + "`" + prefix + "quote anime [anime]`\n"  + "`" + prefix + "quote char [character]`\nGives a quote, if specified it gives from a specified character or anime",
            inline: false
        }
    );



    return helpsearch
}



