const db = client.db
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "deposit",
    description: "Wpłaca monety do banku",
    aliases: ["dep", "wplac"],
    category: "economy",
    guildOnly: true,

    async run(msg, args) {
        let user = msg.author;
        var bank = await db.fetch(`bank_${msg.guild.id}_${user.id}`)
       
        var bal = await db.fetch(`money_${msg.guild.id}_${user.id}`)
      
        if (!bank) {
          bank = "0"
        }
        let all = bal + bank
      let currency = await db.fetch(`${msg.guild.id}.currency`)
      if (!currency) {
        currency = "$"
      }
        if (bal === null || !bal) bal = 0;
        if (args[0] < 1) {
          let embed = new MessageEmbed()
          .setTitle(`Wpłata odrzucona`)
          .setColor("#f00a0a")
          .setDescription(`Kwota którą chcesz wpłacić do banku musi stanowić conajmniej \`1\` monetę.\nPróbowałeś wpłacić: \`${args[0]}\`${currency}`)
      
          msg.channel.send(embed)
          return;
        }
        if(isNaN(args[0])) {
          let embed = new MessageEmbed()
          .setTitle(`Wypłata odrzucona`)
          .setColor("#f00a0a")
          .setDescription(`Kwota którą chcesz wpłacić musi być prawidłową liczbą.`)
      
          msg.channel.send(embed)
          return;
        }
          var amount = args[0]
          if (args[0] > bal) {
            let embed = new MessageEmbed()
            .setTitle(`Wypłata odrzucona`)
            .setColor("#f00a0a")
            .setDescription(`Nie posiadasz wystarczającej liczby pieniędzy. Twoje monety w portfelu: \`${bal}\`${currency}\nPróbowałeś wpłacić: \`${args[0]}\`${currency}`)
        
            msg.channel.send(embed)
          
            return;
          }
    
        
          var prebanked = await db.fetch(`bank_${msg.guild.id}_${user.id}`)
        db.subtract(`money_${msg.guild.id}_${user.id}`, amount)
        db.set(`bank_${msg.guild.id}_${user.id}`, Number(prebanked) + Number(amount))
        

if (!prebanked) {
  prebanked = 0;
}
            let embed = new MessageEmbed()
            .setTitle(`Wpłacono ${args[0]}${currency}`)
            .setColor("#f00a0a")
            .setDescription(`W banku znajduje się teraz ${Number(prebanked) + Number(amount)}${currency}`)
        
            msg.channel.send(embed)
            
           
          
        
          }
}
