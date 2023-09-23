const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const fs = require("fs");
let prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  let user = message.mentions.users.first() || message.author;

  const arabalar = {
    "Mercedes Maybach S680": "https://cdn.motor1.com/images/mgl/v9bvY/s1/2022-mercedes-maybach-s680.webp",
    "BMW i7": "https://ares.shiftdelete.net/2022/04/bmw-i7-xdrive60-tanitildi.jpg",
    "Audi S8": "https://cdn.motor1.com/images/mgl/28MWB/s1/2022-audi-s8.webp",
    "Bugatti Mistral": "https://cdn.motor1.com/images/mgl/BXXw8A/s1/2024-bugatti-mistral.jpg",
    "Audi RS 7": "https://i.ytimg.com/vi/jwC061bKG2Y/maxresdefault.jpg",
    "Nissan GT-R": "https://cdn.motor1.com/images/mgl/rMjOr/s1/2022-nissan-gt-r-nismo-special-edition.jpg",
    "TOGG T10X": "https://img.piri.net/mnresize/712/-/resim/imagecrop/2022/11/01/10/34/resized_b9266-9c2dd2e0toggdunyamansetlerinderusyadanabdyecindenyunanistanaherkesovguyagdirdi1667121343392.jpg",
    "Tofaş Doğan SLX": "https://s0.smartresize.com/wallpaper/541/830/HD-wallpaper-unal-turan-tofas-34vtf58-dogan-farzetki-matkaps-modifiye-sahin-slx-tofas-tofask.jpg",
    "Rolls Royce Cullinan": "https://i0.wp.com/safencars.com/wp-content/uploads/2022/12/DSC_8259-scaled.jpg",
  };

  let randomMarka = Object.keys(arabalar)[Math.floor(Math.random() * Object.keys(arabalar).length)];
  let arabagorsel = arabalar[randomMarka];
  
  if (!message.mentions.users.first()) {
    const uyarimesaji = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(`<@${message.author.id}> | Lütfen Araba Hediye Etmek İstediğiniz Kullanıcıyı Etiketleyin. Örnek: \`${prefix}arabahediyeet [Username]\``);
    return message.channel.send(uyarimesaji);
  }

  const arabaver = new Discord.MessageEmbed()
    .setDescription(`${message.author} ${user} Kişisine **Vegga** Galeriden **${randomMarka}** Hediye Etti. 😱`)
    .setImage(arabagorsel)
    .setColor("BLACK")
    .setFooter(
      `${message.author.username} tarafından istendi.`,
      user.avatarURL()
    );
  message.channel.send(arabaver);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "arabahediyeet",
  description: "Etiketlenen Kişiye Araba Hediye Edersiniz",
  usage: "arabahediyeet"
};