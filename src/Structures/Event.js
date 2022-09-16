/** @format */

const Discord = require("discord.js");

const Client = require("./client.js");

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {Client} client
 * @param {Message} message
 * @param {Guild} guild
 * @param {Discord.ClientEvents[K]} eventArgs
 */
function RunFunction(client,message, ...eventArgs) {}

/**
 * @template {keyof Discord.ClientEvents} K
 */
class Event {
	/**
	 * @param {K} event
	 * @param {RunFunction<K>} runFunction
	 */
	constructor(event, runFunction) {
		this.event = event;
		this.run = runFunction;
	}
}

module.exports = Event;
