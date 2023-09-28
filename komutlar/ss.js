const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  // Sadece "selam" yazıldığında yanıt verme işlemi
  if (message.content.toLowerCase() === "selam") {
    message.channel.send("Kara para aklamaya ne dersin yavrum?");
    
    // Yanıtı log kanalına gönderme
    const logKanalID = ayarlar.logKanal; // ayarlar.json'dan log kanalının ID'sini alın
    const logKanal = message.guild.channels.cache.get(logKanalID);
    if (logKanal) {
      logKanal.send("Kara para aklamaya ne dersin yavrum?"); // Yanıtı log kanalına gönderme
    } else {
      console.error("Log kanalı bulunamadı!");
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [], // Komutun alternatif isimleri (örneğin: ["komut", "alternatif"])
  permLevel: 0 // Komutu kimler kullanabilir (yetki seviyesi)
};

exports.help = {
  name: "komut", // Komutun adı
  description: "Komutun açıklaması", // Komutun açıklaması
  usage: "komut" // Komutun nasıl kullanılacağı hakkında bilgi
};
