const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {
  // Etiketlenmiş kullanıcıyı al
  let user = message.mentions.users.first() || message.author;

  let userinfo = {};
  userinfo.avatar = user.avatarURL();
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setAuthor(message.author.username, message.author.avatarURL())
      .addField("**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**");
    return message.author.send(ozelmesajuyari);
  }
  if (message.channel.type !== "dm") {
    const sunucubilgi = new Discord.MessageEmbed()
      .setDescription(`**Eyvahh Eyvahh** ${user} Siktin 😱`) // Kullanıcının adını burada etiketledik.
      .setColor("BLACK")
      .setFooter(
        `${message.author.username} tarafından istendi.`,
        userinfo.avatar
      )
      .setImage(
        `https://i.pinimg.com/originals/5a/28/de/5a28def9428afff43e86e21ffe382dc9.jpg`
      );
    return message.channel.send(sunucubilgi);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "sikme",
  description: "Etiketlenen Kişiyi Siker (hamile kalmaz merak etmeyin 😀)",
  usage: "sikme <@kullanıcı>"
};