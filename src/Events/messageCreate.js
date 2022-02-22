/** @format */

var global_prefix

const Event = require("../Structures/Event.js");

const config = require("../Data/config.json")

const prefixSchema = require('../Schemas/prefix-schema');

const wishanimeSchema = require('../Schemas/wishanime')

const Discord = require('discord.js')

const enabledm = require('../Schemas/dm')

const color = require('../Data/colors.json')

const mongo = require("../Database/index");


module.exports = new Event("messageCreate", async (client, message) => {
	try {
		if (message.author.id === '432610292342587392' || message.author.id === '899264565655781386' || message.author.id === "887373180036079636") {


			if(message.embeds[0].color === 1360437) {

			const dm = new Discord.MessageEmbed()
				.setTitle(message.channel.name)
				.setURL(`https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
                .setColor(message.embeds[0].color)
				.setDescription(message.embeds[0].description)
                .setAuthor(message.embeds[0].author.name)
                .setImage(message.embeds[0].image.url)


			const message_embed = message.embeds[0]
			const message_content = message.content

			const data = await enabledm.find({ guildId : message.guild.id })

			const ulist = ["602566345711681548", //francisco
						"214432407200333824", //paulo
						"331167280069345290", //leo
						"350762185368141826", //soares 
						"344544526800650241" ] //henrique

			for (const obj of data) {
				if (obj.guildId === message.guild.id) {
					for (const user of obj.users) {
						if (user !== '331469231730458624') {
							ulist.push(user)
						} else {
							client.users.cache.get(user).send({ embeds : [dm]});
							client.users.cache.get(user).send({ embeds : [dm]});
							client.users.cache.get(user).send({ embeds : [dm]});
							client.users.cache.get(user).send({ embeds : [dm]});
							client.users.cache.get(user).send({ 
								content: message_content,
								embeds : [dm]
							});
						}
					}
				}

				const useFilter = arr => {
					return arr.filter((value, index, self) => {
					  return self.indexOf(value) === index;
					});
				  };
				   
				  const ulist_filtered = useFilter(ulist);
		

				setTimeout(() => {
					for (u of ulist_filtered) {
						client.users.cache.get(u).send({ 
								content: message_content,
								embeds : [dm]});
					}
				}, 5000);

			}

			
		}
			
		const description_name = message.embeds[0].description.split('<').slice(0,1).join(' ')
		if (message.embeds[0].color !== 16751916 && message.embeds[0].color !== 16751660) {return}


		const title = description_name.toLowerCase()

			await mongo().then(async (mongoose) => {
				try {
					const data = await wishanimeSchema.find({ guilId :  message.guild.id }) //Filter not working
					
					let a = []
					
					for(const obj of data)  {
						
						if (obj.guildId === message.guild.id) {
							if (title.includes(obj.anime.toLowerCase()) && obj.guildId === message.guild.id) {
								for (const user of obj.users) {
									a.push(`<@${user}>`) 
								}
							}
						}
					
					}
					if (a[0] !== undefined) {


						const dat = await enabledm.find({ guildId : message.guild.id }) //Filter not working
				
						const dm1 = new Discord.MessageEmbed()
							.setTitle(message.channel.name)
							.setDescription(message.embeds[0].description)
							.setURL(`https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
							.setColor(message.embeds[0].color)
							.setAuthor(message.embeds[0].author.name)
							.setImage(message.embeds[0].image.url)

						for (const obj of dat) {
					
							for (const user of obj.users) {
							
								if (a.includes(`<@${user}>`)) {

									const u = client.users.cache.get(user)

									const userindex = a.indexOf(`<@${user}>`)
								
									a[userindex] = `**${u.username}**`
								
									client.users.cache.get(user).send({ embeds : [dm1]});
							
								}
							}
						}
						if (a.length !== 0) {
							message.reply(a.join('  ')) 
						}
							
					
						
					}
					
		
				} finally {
					mongoose.connection.close
				}
			})
		}
	} catch(e) {}

	if (message.author.bot) return;
	
	await mongo().then(async (mongoose) => {
		try {
			const data = await prefixSchema.findOne({_id:  message.guild.id})

			if (data === null) {
				global_prefix = config.prefix 
			} else {
				global_prefix = data.prefix
			}
		} finally {
			mongoose.connection.close
		}
	})


	if (!message.content.startsWith(global_prefix)) return;

	const args = message.content.substring(global_prefix.length).split(/ +/);

	args_lowercased = args.map(arg => arg.toLowerCase())

	const command = client.commands.find(cmd => cmd.name == args_lowercased[0]) || client.aliases.get(args_lowercased[0]);

	const send_messages = message.guild.me.permissionsIn(message.channel.id).has("SEND_MESSAGES")

	if (!send_messages) return

	const embed_links = message.guild.me.permissionsIn(message.channel.id).has("EMBED_LINKS")

	if (!embed_links) return message.channel.send("⛔ I'm missing the **embed links** permission ")

	if (!command) return

	

	function titleCase(str) {
		var splitStr = str.toLowerCase().split(' ');
		for (var i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
		}
		return splitStr.join(' '); 
	 }

	//titleCase(command.permission.replace('_', ' '))

	const bot_permission = message.guild.me.permissionsIn(message.channel.id).has(command.botpermission, true)

	if (!bot_permission) {
		const Client_missing_permissions = new Discord.MessageEmbed()
		.setDescription(`I'm missing the **${command.botpermission.toLowerCase().replace('_', ' ')}** permission`)
		.setColor(color.missing_permissions)
		
		return message.channel.send({ embeds: [Client_missing_permissions] });
	}
		

	

	const permission = message.member.permissionsIn(message.channel.id).any(command.permission, true);

	if (!permission) {
		const User_missing_permissions = new Discord.MessageEmbed()
		.setDescription(`**${message.author.username}**, you can't do that`)
		.setColor(color.missing_permissions)

		return message.channel.send({ embeds: [User_missing_permissions] });
	}
		


	

	command.run(message, args, client);
});

