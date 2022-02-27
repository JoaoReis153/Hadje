/** @format */

const Discord = require('discord.js')

const config = require('../../Data/config.json')

const customEmbed = require('../../Schemas/customembed')

const Command = require("../../Structures/Command.js");

const mongo = require('../../Database/index');

var customName, images

module.exports = new Command({
	name: "ic",
	description: "Adds pictures to the custom embed",           
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
        message.reply("It's working")
//$ic customName$url$url$url$url
        args = args.slice(1)
        const texto = args.join('')
        a = texto.split('$')

        customName = a[0]
        images = a.slice(1)
        
        



		await mongo().then(async (mongoose) => {
            try {

                for (const image of images) {
                    console.log(image)
                    const data = await customEmbed.findOneAndUpdate(
                        {
                            customname : customName,
                        },{
                            customName,
                            $push : {
                                images : image 
                            }
                        },{
                            upsert:true
                        }
                    )
                    console.log(data)
                }
                
            } catch(e) {
                console.log(e)
            } finally {
                mongoose.connection.close()
            }
        })
	}
});
