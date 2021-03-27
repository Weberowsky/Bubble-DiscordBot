const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "withdraw",
    description: "Wypłaca monety z banku",
    aliases: ["wyplac", "wd"],
    category: "economy",
    guildOnly: true,
    args: 1,
    ussage: "<ilość monet>",

    async run(msg, args) {
       
            let embed = new MessageEmbed()
          .setTitle(`Komenda wyłączona`)
          .setColor("#f00a0a")
          .setDescription(`Komenda została wyłączona z powodu: **Baza danych bota jest w trakcie przenoszenia. W niektórych funkcjach ekonomii mogą występować problemy, dlatego zostały wyłączone.**`)
      
          msg.channel.send(embed)
        
          }
}
