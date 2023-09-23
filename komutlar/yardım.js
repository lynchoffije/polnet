const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message) => {
  let prefix = ayarlar.prefix;

  const embed = new Discord.MessageEmbed()
    .setAuthor(`Craveo`)
    .setTitle(``)
    .setColor("#00ff00")
    .setThumbnail(client.user.avatarURL())
   .setImage('https://cdn.discordapp.com/attachments/1154394792139161600/1154799118200360980/craveo-banner.gif')
    .setDescription(
      `🎧 Craveo Botumuzu Eklemek İçin \`${prefix}davet\` yazabilirsiniz.`
    )
    .addField(
      `__Genel Komutlar__`,
      `💬 \`${prefix}genel\``,
      true
    )
    .addField(
      `__Ad Soyad Sorgu__`,
      `👥 \`${prefix}adsoyasorgu\``,
      true
    )
    .addField(
      `__Sorgu Çözümleri__`,
      `👥 \`${prefix}sorgucozumleri\``,
      true
    )
    .addField(
      `__Genel Sorgular__`,
      `👥 \`${prefix}genelsorgular\``,
      true
    )
    .addField(
      `__Numara Çözümleri__`,
      `👥 \`${prefix}numaracozumleri\``,
      true
    )
    .addField(
      `__Sağlık Çözümleri__`,
      `👥 \`${prefix}saglikcozumleri\``,
      true
    )
    .addField(
      `__Araç ve Şahıs Çözümleri__`,
      `👥 \`${prefix}aracvesahiscozumleri\``,
      true
    )
    .addField(
      `__İnternet Çözümleri__`,
      `👥 \`${prefix}internetcozumleri\``,
      true
    )
    .addField(
      `__Eğitim Çözümleri__`,
      `👥 \`${prefix}egitimcozumleri\``,
      true
    )
    .addField(
      `__Bilgilendirme__`,
      `🔱  \`${prefix}davet\` | Botu Sununuya Davet Edersiniz\n 🔱 \`${prefix}botbilgi\` | Botun İstatistiklerini Görürsünüz.`
    );
  return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Yardım Menüsü",
  usage: "yardım"
};
