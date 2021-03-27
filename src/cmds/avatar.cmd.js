const { MessageEmbed } = require("discord.js")
const f = require(__dirname + "/../functions.js")
module.exports = {
    name:"avatar",
    aliases: ["av", "awatar"],
    description:"Pokazuje avatar użytkownika.",
    category: "tools",
    guildOnly: true,
    run(msg, args) {
        let user = msg.guild.members.cache.get(msg.author.id)
          if (args.length) {
            if (!args[0].startsWith("<@") || !args[0].endsWith(">")) {
              const id = args[0]
                user = msg.guild.members.cache.find(m => m.id === id)
              if (!user) {
              const username = args.join(" ").toLowerCase()
              user = msg.guild.members.cache.find(m => m.displayName.toLowerCase() === username)
              if (!user) user = msg.guild.members.cache.find(m => m.displayName.toLowerCase().includes(username))
            }
          }
            if (args[0].startsWith("<@") && args[0].endsWith(">")) user = msg.mentions.members.first()
          }
          if (!user) return msg.channel.send(f.customEmoji("no") + " Podaj prawidłową osobę \`( ID / Wzmianka / Nick)\`.")
      
      const embed = new MessageEmbed()
      .setTitle("Avatar")
      .setColor("#00FF59")
      .setDescription(`Avatar użytkownika ${user}.`)
      .setImage(user.user.displayAvatarURL({dynamic: true, size: 2048}))
      .setTimestamp()
      .setFooter(`Wywołano przez: ${msg.author.username}`,  msg.author.displayAvatarURL())

      msg.channel.send(embed)
      
    }
}