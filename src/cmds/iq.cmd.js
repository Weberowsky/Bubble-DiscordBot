const db = require("quick.db")
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "iq",
    description: "Oblicza iq wybranego użytkownika",
    category: "fun",

    run(msg, args) {
        const { channel, guild } = msg
        let user = msg.guild.members.cache.get(msg.author.id)
        if (args.length) {
          if (!args[0].startsWith("<@") || !args[0].endsWith(">")) {
            const id = args[0]
              user = msg.guild.members.cache.find(m => m.user.id === id)
              console.log(user)
            if (!user) {
            const username = args.join(" ").toLowerCase()
            user = msg.guild.members.cache.find(m => m.displayName.toLowerCase() === username)
            if (!user) user = msg.guild.members.cache.find(m => m.displayName.toLowerCase().includes(username))
          }
        }
          if (args[0].startsWith("<@") && args[0].endsWith(">") && !user) user = msg.mentions.members.first()
          if (!user) return msg.channel.send(f.customEmoji("bad") + " Podaj prawidłową osobę znajdującą się na tym serwerze.")
      }

        let amount = f.randomNumber(10, 200);
        const emb = new MessageEmbed()
        .setTitle(`Liczba IQ ${user.user.username}`)
        .setColor('RANDOM')
        .setDescription(`Liczba IQ użytkownika ${user} wynosi **${amount}**`)
        .setFooter(`Wywołane przez ${msg.author.tag}`, msg.author.displayAvatarURL())
        msg.channel.send(emb)
    }
}