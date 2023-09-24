const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message) => {
  const embedadsoyadsorgu = new Discord.MessageEmbed()
    .setAuthor(`PolNet  | Ad Soyad Sorgu`)
    .setTitle(``)
    .setColor(`BLACK`)
    .setImage(
      "https://cdn.discordapp.com/attachments/1154394792139161600/1154799118200360980/craveo-banner.gif"
    )
    .setThumbnail(client.user.avatarURL())
    .setDescription(
      `🔔 PolNet  Botumuzu Eklemek İçin \`${prefix}davet\` yazabilirsiniz.`
    )
    .addField(
      `__Ad Soyad PRO__`,
      `🚨 \`${prefix}adsoyadpro [Adı] [Soyadı] [Nüfus İli] [Nüfus İlçesi]\` Sorguladığınız Kişinin Bilgilerini Verir.`,
      true
    )
    .addField(
      `__Göçmen Ad Soyad__`,
      `🚨 \`${prefix}gocmenadsoyad [Adı] [Soyadı] [Nüfus İli] [Nüfus İlçesi]\` Sorguladığınız Göçmenin Bilgilerini Verir.`,
      true
    )
    .addField(
      `__Bilgilendirme__`,
      `📙 \`${prefix}davet\` | Botu Sununuya Davet Edersiniz\n 📙 \`${prefix}botbilgi\` | Botun İstatistiklerini Görürsünüz`
    );
  return message.channel.send(embedadsoyadsorgu);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: "adsoyadsorgu",
  description: "Ad Soyad Sorgu Menüsü",
  usage: "adsoyadsorgu",
};
