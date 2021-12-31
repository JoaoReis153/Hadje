/** @format */

const Command = require("../../Structures/Command.js");

const config = require('../../Data/config.json')

const { syntaxResponse, confirmationResponse } = require('../../Util/Embeds/wishremove')

const prefixSchema = require('../../Schemas/prefix-schema')

const wishanimeSchema = require('../../Schemas/wishanime')

const mongo = require('../../Database/index')

module.exports = new Command({
	name: "wishremove",
	aliases: ['wremove'],
	description: "YOHOHO",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
		const anime_name = args.slice(1).join(' ')

        if (!anime_name) {
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
            
			return message.channel.send({embeds:[syntaxResponse(prefix)]});
        }

    await mongo().then(async (mongoose) => {
        try {
            const data = await wishanimeSchema.updateMany({ _id : message.guild.id}),
            {$pull : {anime: anime_name}}
            return message.channel.send({ embeds : [confirmationResponse()] })
        } finally {
            mongoose.connection.close()
        }    
    })


	}
});