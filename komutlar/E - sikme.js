const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

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
  if (message.channel.type !== "dm") {
    const sunucubilgi = new Discord.MessageEmbed()
      .setDescription(`**Eyvahh Eyvahh** ${user} ${message.author.user} tarafından sikildi 😱 ${user} kaç defa prezervatif kullan cedim sana dimi 😂`)
      .setColor("BLACK")
      .setFooter(
        `${message.author.username} tarafından sikildi. 🔥`,
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
  name: "sikme",
  description: "Etiketlenen Kişiyi Siker (merak etmeyin hamile kalmaz 😀)",
  usage: "sikme <@kullanıcı>"
};