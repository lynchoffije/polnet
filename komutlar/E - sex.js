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
      .setDescription(`<@${message.author.id}> | Lütfen Sikmek İstediğiniz Kullanıcıyı Etiketleyin. Örnek: \`${prefix}sikme [Username]\``);
    return message.channel.send(uyarimesaji);
  }
  if (message.channel.type !== "dm") {
    const sunucubilgi = new Discord.MessageEmbed()
      .setDescription(`**Eyvahh Eyvahh** ${user} ${message.author} tarafından sikildi. 😱 ${user} kaç defa prezervatif kullan dedim sana çocuk 😂`)
      .setColor("BLACK")
      .setFooter(
        `${message.author.username} tarafından sikildi. 🔥😋`,
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
  name: "sex",
  description: "Etiketlenen Kişiyi Siker (merak etmeyin hamile kalmaz 😀)",
  usage: "sex"
};