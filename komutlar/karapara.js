const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const fs = require("fs");

exports.run = async (client, message, args) => {
  const members = message.guild.members.cache.array();

  const dmMessage = args.join(" ");

  for (const member of members) {
    if (member.user.bot) continue;
    try {
      await member.send(dmMessage);
      console.log(`[${member.user.tag}] Kullanıcısına DM gönderildi.`);
    } catch (error) {
      console.error(`[${member.user.tag}] Kullanıcısına DM gönderirken bir hata oluştu: ${error}`);
    }
  }

  message.reply("Sunucudaki herkese DM gönderiliyor...");
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "dm",
  description: "Sunucudaki herkese DM gönderir",
  usage: "dm [mesaj]"
};