/** @format */

const Command = require("../../Structures/Command.js");

const { invite_link } = require('../../Data/config.json')

const { formatResponse } = require('../../Util/Embeds/Basic/invite.js')

module.exports = new Command({
	name: "invitelink",
    aliases: ["invite", "invitebot", "bot", "convite"],
	description: "Invite link",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {

		message.reply({ embeds: [formatResponse(invite_link)] });

	}
});
