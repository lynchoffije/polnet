const Discord = require("discord.js");
const request = require("request");

exports.run = async (client, message, args) => {
  let tcNo = args.join("");
  if (!tcNo) {
    return message.reply("TC Kimlik Numarasını girmelisiniz. Örnek: `!vergi 10588936370`");
  }
  
  let userinfo = {};
  userinfo.avatar = message.author.avatarURL();

  request(`https://teknobash.com/vergi.php?tc=${tcNo}`, async function (
    err,
    resp,
    body
  ) {
    if (err) {
      console.error(err);
      return message.channel.send("Bir hata oluştu.");
    }

    const data = JSON.parse(body)[0];

    const resultMessage = new Discord.MessageEmbed()
      .setTitle("Vergi Dairesi Sorgusu Sonuçları")
      .addField("TC Kimlik No", data["TC Kimlik No"])
      .addField("Adı Soyadı", data["Ad"])
      .addField("Vergi No", data["Vergi No"])
      .addField("Vergi Dairesi Adı", data["Vergi Dairesi Adı"])
      .addField("Vergi Dairesi Kodu", data["Vergi Dairesi Kodu"])
      .setColor("RANDOM")
      .setFooter(`${message.author.username} tarafından istendi.`, userinfo.avatar);

    message.channel.send(resultMessage);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tc-sorgula", "tcsorgula", "tckimlik"],
  permLevel: 0
};

exports.help = {
  name: "vergi",
  description: "Vergi Dairesi Sorgusu yapar.",
  usage: "vergi <TC Kimlik Numarası>"
};
