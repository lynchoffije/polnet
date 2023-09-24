const Discord = require("discord.js");
const request = require("request");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  const premium = ayarlar.premium;

  if (!message.member.roles.cache.has(premium)) {
    const managers = ['lynchoffije#0', 'mer.gen#0', 'wanted_2015#0'];
    
    const taggedmanagers = managers.map(username => {
      const member = message.guild.members.cache.find(member => member.user.tag === username);
      if (member) {
        return member.toString();
      } else {
        return username;
      }
    }).join(' ');

    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(
          `<@${message.author.id}> | Bu Sorguyu Kullanabilmek İçin Premium Üye Rolünüz Olması Gerekiyor. Premium Üye Rolünü Almak İçin ${taggedmanagers} 'a Yazabilirsiniz.`
        )
    );
  }

  let tc = args[0];

  if (!tc)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(
          `<@${message.author.id}> | Lütfen Sorgulama İçin T.C. Kimlik Numarasını Giriniz. Örnek: \`${prefix}aile [TC] \``
        )
    );

  const url = `https://www.site.com/api/aile.php?tc=${encodeURIComponent(tc)}`;

  request(url, (error, response, body) => {
    if (error) {
      console.error(error);
      return message.reply("Veriler alınırken bir hata oluştu.");
    }

    try {
      const data = JSON.parse(body)[0];

      if (!data) {
        return message.reply("Veri bulunamadı.");
      }

      const resultMessage = new Discord.MessageEmbed()
        .setTitle("Aile Sorgu Sonuçları")
        .addField("TC", data["TC"])
        .addField("ADI SOYADI", data["ADSOYAD"])
        .addField("DOĞUM TARİHİ", data["DOGUMTARIHI"])
        .addField("ANNE BİLGİ", data["ANNEBILGI"])
        .addField("BABA BİLGİ", data["BABABILGI"])
        .addField("İL / İLÇE", data["ILILCE"])
        .addField("UYRUK", data["UYRUK"])
        .setColor("RANDOM")
        .setFooter(
          `${message.author.username} tarafından sorgulandı.`,
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
  aliases: ["aile"],
  permLevel: 0
};

exports.help = {
  name: "aile",
  description: "Sorguladığınız kişinin ailesinin T.C. kimlik bilgilerini verir.",
  usage: "aile [TC]"
};