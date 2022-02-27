/** @format */

const Discord = require("discord.js");

const Command = require("./Command.js");

const Event = require("./Event.js");

const config = require("../Data/config.json");

const intents = new Discord.Intents(32767);

const fs = require("fs");

const prefix = require('../Events/messageCreate')



class Client extends Discord.Client {
	constructor() {
		super({ intents });

		/**
		 * @type {Discord.Collection<string, Command>}
		 */
		this.commands = new Discord.Collection();
		this.aliases = new Discord.Collection();
		this.prefix = config.prefix;
	}

	

	start(token) {

		let folders = ['Basic', 'LOL', 'Moderation', 'Others', 'Server', 'Test', 'Waifus']
 
		for (const folder of folders) {
			fs.readdirSync(`./src/Commands/${folder}`)
				.filter(file => file.endsWith(".js"))
				.forEach(file => {
					/**
					 * @type {Command}
					 */
					const command = require(`../Commands/${folder}/${file}`);
					console.log(`(Command)(${folder}) - ${command.name}`);
					this.commands.set(command.name, command);

					if (command.aliases) {
						command.aliases.forEach(aliases => {
							this.aliases.set(aliases,command)
						})
					}
				});
		}

		

		console.log('----------------------------')	

		fs.readdirSync("./src/Events")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Event}
				 */
				const event = require(`../Events/${file}`);
				console.log(`(Event) - ${event.event}`);
				this.on(event.event, event.run.bind(null, this));
			});

		console.log('----------------------------')	

		this.login(token);
	}
}

module.exports = Client;
