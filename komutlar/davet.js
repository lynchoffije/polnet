const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message) => {


  const fynxcode = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setAuthor(`Craveo Davet Menü`)
    .setDescription(
      `**💼 Botun Davet Linki [TIKLA](https://discord.com/api/oauth2/authorize?client_id=1078040275080990830&permissions=8&scope=bot)**\n`
    )
    .addField(
      `__Bilgilendirme__`,
      `🔰  \`${prefix}davet\` | Botu Sununuya Davet Edersiniz\n 🔰 \`${prefix}botbilgi\` | Botun İstatistiklerini Görürsünüz.`
    )
    .setImage('https://cdn.discordapp.com/attachments/1154394792139161600/1154799118200360980/craveo-banner.gif')
    .setThumbnail(client.user.avatarURL());

  return message.channel.send(fynxcode);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["davet"],
  permLevel: 0
};

exports.help = {
  name: "davet",
  description: "Davet Menüsü",
  usage: ""
};
