/** @format */

const Client = require("./client.js");

const Discord = require("discord.js");

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {Client} client
 */
function RunFunction(message, args, client) {}

class Command {
	/**
	 * @typedef {{name: string, description: string, aliases:[], permission: Discord.PermissionString,  botpermission: Discord.PermissionString,  run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
	 */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.aliases = options.aliases;
		this.permission = options.permission;
		this.botpermission = options.botpermission
		this.run = options.run;
	}
}

module.exports = Command;
