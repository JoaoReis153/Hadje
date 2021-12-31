const Discord = require('discord.js');

const color = require('../../../Data/colors.json')


module.exports.usermissingPermissions = (permission_titlecased, user_avatar) => {
    const User_missing_permissions = new Discord.MessageEmbed()
    .setTitle("🛠️   Missing Permission   🛠️")
    .setDescription(`\u200b
                    ➤ Permission(s) missing:
                    ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤㅤ⋅ㅤ
                    ☐ ${permission_titlecased}`)
    .setColor(color.missing_permissions)
    .setThumbnail(user_avatar)
	
    return User_missing_permissions
};

module.exports.clientmissingPermissions = (permission_titlecased, client_avatar) => {
    const Client_missing_permissions = new Discord.MessageEmbed()
    .setTitle("🛠️   Missing Permission   🛠️")
    .setDescription(`\u200b
                    ➤ Permission(s) missing:

                    ☐ ${permission_titlecased}`)
    .setColor(color.missing_permissions)
    .setThumbnail(client_avatar)

    return Client_missing_permissions
	
};

