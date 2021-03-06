const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");

module.exports = {
	name: "enableme",
	description: "enableme",
	async execute(message, args, globalArgs) {
		const ServerModel = globalArgs.ServerModel;
		const UserModel = globalArgs.UserModel;
		const userFULL = message.member.user;

		console.log(ServerModel);
		const server = await ServerModel.findOne({ guildID: message.guild.id });
		if (!server)
			return message.reply(`please run ${globalArgs.prefix}init first`);
		const user = await UserModel.findOneAndUpdate(
			{
				guildID: message.guild.id,
				userID: userFULL.id,
			},
			{ enabled: true, username: userFULL.tag }
		);
		if (user) {
			await UserModel.findOneAndUpdate({
				userID: userFULL.id,
				guildID: message.guild.id,
				enabled: true,
				avatarState: 0,
				avatarURL: null,
				username: userFULL.tag,
				forceName: null,
			});
			return message.reply("Ok, I will add you to the overlay");
		} else {
			const newUser = await new UserModel({
				userID: userFULL.id,
				guildID: message.guild.id,
				enabled: true,
				avatarState: 0,
				avatarURL: null,
				username: userFULL.tag,
				forceName: null,
			});
			newUser.save((err) => {
				if (err) return console.log(err);
			});
			return message.reply("Ok, I will add you to the overlay");
		}
	},
};
