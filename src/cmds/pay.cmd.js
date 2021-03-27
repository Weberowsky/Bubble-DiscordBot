
const f = require(__dirname + "/../functions.js")
const db = client.db
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "przelew",
    description: "Przekazuje monety wybranemu użytkownikowi.",
    category: "economy",
    aliases: ["pay", "przelej", "podaruj"],
    usage: "@osoba <ilość monet>",

        async run(msg, args) {
        let user = msg.mentions.members.first() 

        let member = await db.fetch(`money_${msg.guild.id}_${msg.author.id}`)
      
        let embed1 = new MessageEmbed()
        .setColor("#f00a0a")
        .setDescription(f.customEmoji("no") + ` Nieprawidłowa @wzmianka.`);
      
        if (!user) {
            return msg.channel.send(embed1)
        }
        let embed2 = new MessageEmbed()
        .setColor("#00FF59")
        .setTitle("Wystąpił błąd")
        .setDescription(f.customEmoji("no") + ` Podaj liczbę monet, które chcesz wysłać użytkownikowi ${user.user.username}`);
        
        if (!args[1]) {
            return msg.channel.send(embed2)
        }
        let embed3 = new MessageEmbed()
        .setColor("#00FF59")
        .setTitle("Wystąpił błąd")
        .setDescription(f.customEmoji("no") + ` Kwota którą chcesz przekazać musi być większa od \`0\`!`);
      
        if (args[1].includes('-')) { 
            return msg.channel.send(embed3)
        }
        let embed4 = new MessageEmbed()
        .setColor("#00FF59")
        .setTitle("Wystąpił błąd")
        .setDescription(f.customEmoji("no") + ` Nie posiadasz wystarczająco dużo monet.`);
      
        if (member < args[1]) {
            return msg.channel.send(embed4)
        }

        function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

        if (isNumber(args[1])) {
            console.log("numer")

        } else {
            let embed6 = new MessageEmbed()
        .setColor("#00FF59")
        .setFooter(`Wywołano przez: ${msg.author.username}`,  msg.author.displayAvatarURL())
        .setTitle("Wystąpił błąd")
        .setDescription(f.customEmoji("no") + ` Wartość monet musi być prawidłową liczbą.`);
        msg.channel.send(embed6)
            return;
        }


        
        let embed5 = new MessageEmbed()
        .setColor("#00FF59")
        .setFooter(`Wywołano przez: ${msg.author.username}`,  msg.author.displayAvatarURL())
        .setTitle("Przekazano monety")
        .setDescription(f.customEmoji("yes") + ` Pomyślnie przekazano użytkownikowi \`${user.user.username}\` **${args[1]}** monet.`);
        
      
        msg.channel.send(embed5)

        db.add(`money_${msg.guild.id}_${user.id}`, args[1])
        db.subtract(`money_${msg.guild.id}_${msg.author.id}`, args[1])
      
      }
      
    }
