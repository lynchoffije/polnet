const Discord = require("discord.js");
const request = require("request");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = (client, message, args) => {
  let tcno = args[0];

  if (!tcno)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(
          `<@${message.author.id}> | TC Kimlik Numarasını Girmelisiniz. Örnek: \`${prefix}vergi [TC Kimlik Numarası]\``
        )
    );

  const url = `https://teknobash.com/vergi.php?tc=${tcno}`;

  request(url, (error, response, body) => {
    if (error) {
      console.error(error);
      return message.reply("Veriler alınırken bir hata oluştu.");
    }

    try {
      const data = JSON.parse(body)[0];

      if (!data) {
        return message.reply("TC Kimlik numarasına ait veri bulunamadı.");
      }

      const resultMessage = new Discord.MessageEmbed()
        .setTitle("Vergi Dairesi Sorgusu Sonuçları")
        .addField("TC Kimlik No", data["TC Kimlik No"])
        .addField("Adı Soyadı", data["Ad"])
        .addField("Vergi No", data["Vergi No"])
        .addField("Vergi Dairesi Adı", data["Vergi Dairesi Adı"])
        .addField("Vergi Dairesi Kodu", data["Vergi Dairesi Kodu"])
        .setColor("RANDOM")
        .setFooter(
          `${message.author.username} tarafından istendi.`,
          message.author.avatarURL()
        );

      message.channel.send(resultMessage);
    } catch (e) {
      console.error(e);
      message.reply("Veri analiz edilirken bir hata oluştu.");
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vergi"],
  permLevel: 0
};

exports.help = {
  name: "vergi",
  description: "TC Kimlik numarasına ait vergi bilgilerini sorgular.",
  usage: "vergi [TC Kimlik Numarası]"
};
