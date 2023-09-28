const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const replaceOnce = require("replace-once");
require("./util/eventLoader.js")(client);
const db = require("quick.db");
const queue = new Map();
const { Canvas } = require("canvas-constructor");
const YouTube = require("simple-youtube-api");
const superagent = require("superagent");
const ytdl = require("ytdl-core");
const ayarlar = require("./ayarlar.json");

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === process.env.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('debug', e => {
  console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
});

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.TOKEN);

client.on('ready', () => {
  var actvs = [
    `devlet ${client.guilds.cache.size} sunucuyu`,
    `devlet ${client.users.cache.size} kullanıcıyı`, 
    `devlet sizi`
  ];

  client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING' });
  setInterval(() => {
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING'});
  }, 15000);

  console.log ('_________________________________________');
  console.log (`Kullanıcı İsmi     : ${client.user.username}`);
  console.log (`Sunucular          : ${client.guilds.cache.size}`);
  console.log (`Kullanıcılar       : ${client.users.cache.size}`);
  console.log (`Prefix             : ${ayarlar.prefix}`);
  console.log (`Durum              : Bot Çevrimiçi!`);
  console.log ('_________________________________________');
  
  setInterval(() => {
    const currentTime = Date.now();

    client.guilds.cache.forEach(guild => {
      guild.members.cache.forEach(async member => {
        let userData = db.get(`perm_${member.id}`);
        if (userData && userData.expirationDate <= currentTime) {
          let role = guild.roles.cache.get(userData.roleID);
          if (role) {
            await member.roles.remove(role);
            db.delete(`perm_${member.id}`);
          }
        }
      });
    });
  }, 3600000);
});

const { MessageEmbed } = require("discord.js");

client.on("message", message => {
  if (message.content === `${prefix}premium`) {
    let haftalikPremiumRolID = ayarlar.premiumHaftalık;
    let aylıkPremiumRolID = ayarlar.premiumAylık;
    let yıllıkPremiumRolID = ayarlar.premiumYıllık;

    const premiumEmbed = new MessageEmbed()
      .setTitle("Premium Yetkileri")
      .setDescription("Premium yetkileriniz başarıyla verildi!")
      .setColor("#FFD700");

    message.member.roles.add([haftalikPremiumRolID, aylıkPremiumRolID, yıllıkPremiumRolID])
      .then(() => {
        message.channel.send(premiumEmbed);
      })
      .catch(err => {
        console.error(err);
        message.channel.send("Premium yetkileri verme sırasında bir hata oluştu.");
      });
  }
});
