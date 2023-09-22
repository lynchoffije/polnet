const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = (client, message, args) => {
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
  if (!message.mentions.users.first()) {
    const uyarimesaji = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(`<@${message.author.id}> | Lütfen Hamcklemek İstediğiniz Kullanıcıyı Etiketleyin. Örnek: \`${prefix}sikme [Username]\``);
    return message.channel.send(uyarimesaji);
  }
  if (message.channel.type !== "dm") {
    const sunucubilgi = new Discord.MessageEmbed()
      .setDescription(`**Eyvahh Eyvahh** ${message.author} ${user} Kişisini Hamckledi. 😱 ${user} Kaç Defa Sana Hamcklenme Dedim Çocuk 😂`)
      .setColor("BLACK")
      .setFooter(
        `${message.author.username} tarafından hamcklendi. 🔥😋`,
        userinfo.avatar
      )
      .setImage(
        `https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNG9zcWFodDdhcnJxa3hsdDQyM2o3N2x0aXQxajJ5ZjVhMHM1ajF2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bJ4TVNYNUympPgcpem/giphy.gif`
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
  name: "hacked",
  description: "Etiketlenen Kişiyi Hackler (korkmayın zarar vermez 😀)",
  usage: "hacked"
};