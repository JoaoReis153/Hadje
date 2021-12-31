/** @format */

const Command = require("../../Structures/Command.js");

const config = require('../../Data/config.json')

const Discord = require('discord.js')

const color = require('../../Data/colors.json')

const ani_watched = require('../../Schemas/ani_watched')

const prefixSchema = require('../../Schemas/prefix-schema')

const { nowishesResponse, syntaxResponse } = require('../../Util/Embeds/whosaw')

const wishanimeSchema = require('../../Schemas/wishanime')

const mongo = require('../../Database/index');

module.exports = new Command({
	name: "whosaw",
	description: "YOHOHO",
	permission: "SEND_MESSAGES",
	botpermission: "SEND_MESSAGES",
	async run(message, args, client) {}})

