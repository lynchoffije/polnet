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
    return message.reply(`Lütfen birini etiketleyin. Örnek: \`${prefix}ss @username\``);
  }
  if (message.channel.type !== "dm") {
    const sunucubilgi = new Discord.MessageEmbed()
      .setDescription(`**Eyvahh Eyvahh** ${user} ${message.author} tarafından ss 😱 ${user} kaç defa prezervatif kullan cedim sana çocuk 😂`)
      .setColor("BLACK")
      .setFooter(
        `${message.author.username} tarafından ss. 🔥😋`,
        userinfo.avatar
      )
      .setImage(
        `https://www.bobbiporno.com/wp-content/uploads/Ayni-anda-sikisen-uc-ciftin-sex-gifleri_0.gif`
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
  name: "ss",
  description: "Etiketlenen ss Siker (merak etmeyin hamile kalmaz 😀)",
  usage: "ss <@kullanıcı>"
};