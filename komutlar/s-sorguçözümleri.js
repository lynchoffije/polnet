const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message) => {


  const embedsorguçözümleri = new Discord.MessageEmbed()
    .setAuthor(`PolNet  | Sorgu Çözümleri`)
    .setTitle(``)
    .setColor(`BLACK`)
    .setImage('https://media.discordapp.net/attachments/1154394792139161600/1154799118200360980/craveo-banner.gif')
    .setThumbnail(client.user.avatarURL())
    .setDescription(
      `👮 PolNet  Botumuzu Eklemek İçin \`${prefix}davet\` yazabilirsiniz.`
    )
    .addField(
      `__T.C. PRO Sorgu__`,
      `🪪 \`${prefix}tcpro [TC]\` Sorguladığınız Kişinin T.C. Kimlik Bilgilerini Verir.`,
      true
    )
    .addField(
      `__T.C. Sorgu__`,
      `🪪 \`${prefix}tc [TC]\` Sorguladığınız Kişinin T.C. Kimlik Bilgilerini Verir.`,
      true
    )
    .addField(
      `__Göçmen T.C. Sorgu__`,
      `🪪 \`${prefix}göçmentc [TC]\` Sorguladığınız Göçmenin T.C. Kimlik Bilgilerini Verir.`,
      true
    )
    .addField(
      `__Aile Sorgu__`,
      `👥 \`${prefix}aile [TC]\` Sorguladığınız Kişinin Ailesinin T.C. Kimlik Bilgilerini Verir.`,
      true
    )
    .addField(
      `__Çocuk Sorgu__`,
      `🧒 \`${prefix}çocuk [ANNETC] [BABATC]\` Sorguladığınız Çocuğun Anne ve Baba T.C. Kimlik Bilgilerini Verir.`,
      true
    )
    .addField(
      `__Soyağacı Sorgu__`,
      `👥 \`${prefix}soyağacı [TC]\` Sorguladığınız Kişinin Soyağacının T.C. Kimlik Bilgilerini Verir.`,
      true
    )
    .addField(
      `__Sülale Sorgu__`,
      `👥 \`${prefix}sülale [TC]\` Sorguladığınız Kişinin Sülalesinin T.C. Kimlik Bilgilerini Verir.`,
      true
    )
    .addField(
      `__Adres PRO Sorgu__`,
      `📍 \`${prefix}adrespro [TC]\` Sorguladığınız Kişinin Adres Bilgilerini Verir.`,
      true
    )
    .addField(
      `__Göçmen Adres Sorgu__`,
      `📍 \`${prefix}göçmenadres [TC]\` Sorguladığınız Göçmenin Adres Bilgilerini Verir.`,
      true
    )
    .addField(
      `__Seri No Sorgu__`,
      `0️⃣ \`${prefix}serino [TC]\` Sorguladığınız Kişinin Seri NO sunu Verir.`,
      true
    )
    .addField(
      `__Bilgilendirme__`,
      `📣 \`${prefix}davet\` | Botu Sununuya Davet Edersiniz\n 🤖 \`${prefix}botbilgi\` | Botun İstatistiklerini Görürsünüz`
    );
  return message.channel.send(embedsorguçözümleri);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "sorguçözümleri",
  description: "Sorgu Çözümleri Menüsü",
  usage: "sorguçözümleri"
};
