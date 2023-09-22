const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const fs = require("fs");

exports.run = (client, message, params) => {
  let user = message.mentions.users.first() || message.author;

  const arabalar = {
    "Mercedes Maybach S680": "https://cdn.motor1.com/images/mgl/v9bvY/s1/2022-mercedes-maybach-s680.webp",
    "BMW i7": "https://ares.shiftdelete.net/2022/04/bmw-i7-xdrive60-tanitildi.jpg",
    "Audi S8": "https://cdn.motor1.com/images/mgl/28MWB/s1/2022-audi-s8.webp",
  };

  let randomMarka = Object.keys(arabalar)[Math.floor(Math.random() * Object.keys(arabalar).length)];
  let arabagorsel = arabalar[randomMarka];

  const arabaver = new Discord.MessageEmbed()
    .setTitle(`${user.username}'ın Arabası:`)
    .setDescription(`Marka: ${randomMarka}`)
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
  name: "araba",
  description: "Etiketlenen kişiye rastgele bir araba markası ve görseli gönderir.",
  usage: "araba"
};