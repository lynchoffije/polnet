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