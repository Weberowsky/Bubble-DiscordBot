const { MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = {
    name: "leaderboard",
    description: "Pokazuje ranking serwera",
    aliases: ["lb", "ranking"],

    run(msg, args) {
       
  let embed = new MessageEmbed()
          .setTitle(`Komenda wyłączona`)
          .setColor("#f00a0a")
          .setDescription(`Komenda została wyłączona z powodu: **Baza danych bota jest w trakcie przenoszenia. W niektórych funkcjach ekonomii mogą występować problemy, dlatego zostały wyłączone.**`)
      
          msg.channel.send(embed)
   
}
 }
