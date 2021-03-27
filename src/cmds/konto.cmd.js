const { MessageEmbed, ClientApplication } = require("discord.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Bubble:babeltrabel52@cluster0.slsu3.mongodb.net/Bubble?retryWrites=true&w=majority");

module.exports = {
    name: "konto",
    aliases: ["monety", "portfel", "bal", "balance"],
    guildOnly: true,
    description: "Wyświetla stan konta.",
    category: "economy",
    ussage: "@użytkownik",

    async run(msg, args) {
        const { channel, guild } = msg
        let user = msg.member
        if (args.length) {
         if (!args[0].startsWith("<@") || !args[0].endsWith(">")) {
              const id = args[0]
                user = msg.guild.members.cache.find(m => m.id === id)
              if (!user) {
              const username = args[0].toLowerCase()
              user = msg.guild.members.cache.find(m => m.displayName.toLowerCase() === username)
              if (!user) user = msg.guild.members.cache.find(m => m.displayName.toLowerCase().includes(username))
            }
          }
            if (args[0].startsWith("<@") && args[0].endsWith(">")) user = msg.mentions.members.first()
        }

        var bal = await db.get(`money_${msg.guild.id}_${user.id}`)
        var bank = await db.get(`bank_${msg.guild.id}_${user.id}`)
        if (!bank) {
          var bank = 0
        }
        if (!bal) {
         var bal = 0
        }
        var all = Number(bal) + Number(bank)
       
        
      let currency = await db.fetch(`${msg.guild.id}.currency`)
      if (!currency) {
        currency = "$"
      }
        if (bal === null || !bal) bal = 0;
embed = new MessageEmbed()
.setTitle(`Stan konta ` + user.displayName)
.addField(`Łącznie`, all + currency)
.addField(`W banku`, bank + currency)
.addField(`W portfelu`, bal + currency)
.setColor("#00FF59")
.setFooter(`Wywołano przez: ${msg.author.username}`,  msg.author.displayAvatarURL())
.setTimestamp()
msg.channel.send(embed)
    }
}
