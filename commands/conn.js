const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "con",
	description: "Connect to voice",
	async execute(message, args, globalArgs) {
		const roleName = globalArgs.roleName;
		const ServerModel = globalArgs.ServerModel;

		const server = await ServerModel.findOne({ guildID: message.guild.id });

		if (!server) return message.reply("please rin the init command");

		let l1 = message.member.roles.cache.some((role) => role.name === roleName);
		if (!l1) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
			if (process.env.ADDRESS) {
				return message.channel.send(
					`Server live on http://${process.env.ADDRESS}/overlay/index.html?id=${server.permanantCode}`
				);
			}
		} else {
			return message.reply(
				"Please join a voice call before using this command"
			);
		}
	},
};
