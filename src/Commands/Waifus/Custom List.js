/** @format */

const Discord = require('discord.js')

const config = require('../../Data/config.json')

const customEmbed = require('../../Schemas/customembed')

const Command = require("../../Structures/command.js");

const mongo = require('../../Database/index');

const prefixSchema = require('../../Schemas/guild-prefixes')

var num, customName, list

module.exports = new Command({
	name: "imlist",
	description: "Adds pictures to the custom embed",           
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {
   
    
     

        
        await mongo().then(async (mongoose) => {
            try {
                const data = await customEmbed.find()
                if (!data) {
                   return 
                }


                list = ''

                for (item of data) {
                 
                    list += '-> ' + item['customname'] +'\n'
            
                }
                console.log(list)
                message.channel.send(list)
          
                

            } finally {
                mongoose.connection.close()
            }    
        })
        
        


	}
});







