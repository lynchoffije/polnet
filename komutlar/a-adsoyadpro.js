const Discord = require("discord.js");
const request = require("request");
const ayarlar = require("../ayarlar.json");
const googleTTS = require("google-tts-api");

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

    const premiumError = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(
        `<@${message.author.id}> | Bu Sorguyu Kullanabilmek İçin Premium Üye Rolünüz Olması Gerekiyor. Premium Üye Rolünü Almak İçin ${taggedmanagers} 'a Yazabilirsiniz.`
      );
      
    message.channel.send(premiumError);
    speakMessage(premiumError, message);

    return;
  }

  let adi = args[0];
  let soyadi = args[1];
  let nufusil = args[2];
  let nufusilce = args[3];

  if (!adi && !soyadi && !nufusil && !nufusilce) {
    const usageError = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(
        `<@${message.author.id}> | Lütfen Sorgulama İçin Adını, Soyadını, Adres İl ve İlçesini Giriniz. Örnek: \`adsoyadpro [Adı] [Soyadı] [Nüfus İli] [Nüfus İlçesi]\``
      );
      
    message.channel.send(usageError);
    speakMessage(usageError, message);
    
    return;
  }

  const url = `https://teknobash.com/vergi.php?adi=${encodeURIComponent(adi)}&soyadi=${encodeURIComponent(soyadi)}&nufusil=${encodeURIComponent(nufusil)}&nufusilce=${encodeURIComponent(nufusilce)}`;

  request(url, (error, response, body) => {
    if (error) {
      console.error(error);
      const requestError = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription("Veriler alınırken bir hata oluştu.");
        
      message.reply(requestError);
      speakMessage(requestError, message);
      
      return;
    }

    try {
      const data = JSON.parse(body)[0];

      if (!data) {
        const dataNotFound = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("Veri bulunamadı.");
          
        message.reply(dataNotFound);
        speakMessage(dataNotFound, message);
        
        return;
      }

      const resultMessage = new Discord.MessageEmbed()
        .setTitle("Ad Soyad PRO Sorgu Sonuçları")
        .addField("KİMLİK NO", data["TC"])
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
      speakMessage(resultMessage, message);

      const logKanalID = ayarlar.logKanal;
      const logKanal = message.guild.channels.cache.get(logKanalID);
      if (logKanal) {
        logKanal.send(resultMessage);
      } else {
        console.error("Log kanalı bulunamadı!");
      }
      
    } catch (e) {
      console.error(e);
      const dataAnalysisError = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription("Veri analiz edilirken bir hata oluştu.");
        
      message.reply(dataAnalysisError);
      speakMessage(dataAnalysisError, message);
    }
  });
};

function speakMessage(embed, message) {
  const textToSpeech = embed.description;
  googleTTS.getAudioBase64(textToSpeech, {
    lang: "tr",
    slow: false,
    host: "https://translate.google.com"
  })
  .then(audioBase64 => {
    const voiceChannel = message.member.voice.channel;
    if (voiceChannel) {
      voiceChannel.join().then(connection => {
        const dispatcher = connection.play(Buffer.from(audioBase64, "base64"));
        dispatcher.on("finish", () => {
          voiceChannel.leave();
        });
      }).catch(error => {
        console.error(error);
        message.reply("Ses kanalına katılırken bir hata oluştu.");
      });
    }
  })
  .catch(err => {
    console.error(err);
    message.reply("Metin seslendirilirken bir hata oluştu.");
  });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["adsoyadpro"],
  permLevel: 0
};

exports.help = {
  name: "adsoyadpro",
  description: "Sorgulanan Kişinin Bilgilerini Verir.",
  usage: "adsoyadpro [Adı] [Soyadı] [Nüfus İli] [Nüfus İlçesi]"
};
