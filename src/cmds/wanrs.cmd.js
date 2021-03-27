const { Permissions: { FLAGS }, MessageEmbed } = require("discord.js");
const f = require(__dirname + "/../functions.js") 
const db = require("quick.db");

module.exports = {
    name: "warns",
    description: "Wyswietla liste ostrzezen.",
    category: "admin",
    guildOnly: true,
    


   async  run(msg, args) {


  const reason = [...args].slice(1).join(" ")
  const { guild, channel } = msg
      const servername = guild.name
      const mod = msg.author.username
      const prefix = db.fetch(`prefix_${msg.guild.id}`)

      let user = msg.guild.members.cache.get(msg.author.id)
      let userid = msg.mentions.members.first()

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
        const err = new MessageEmbed()
        .setTitle("Błąd!")
        .setTimestamp()
        .setColor(f.colorToHex("Red"))
        .setDescription(f.customEmoji("no") + " Nie znaleziono podanego użytkownika. Pamiętaj, że aby poprawnie użyć tej komendy należy oznaczyć członka serwera, wpisać jego ID lub nick.")
        if (!user) return msg.channel.send(err)
    }
        
        
      
        
    const nosnipe = "Użytkownik nie posiada ostrzeżeń"
    if (!db.get(`${msg.guild.id}.warns`)) return msg.channel.send(nosnipe)
    if (!db.get(`${msg.guild.id}.warns.${user.user.id}`)) return msg.channel.send(nosnipe)
    if (db.get(`${msg.guild.id}.warns.${user.user.id}`).length < 1) return msg.channel.send(nosnipe)

    const sniped = db.get(`${msg.guild.id}.warns.${user.user.id}`)
    const embed = new MessageEmbed()
    .setTitle("Ostrzeżenia " + user.user.username)
    .setColor(f.colorToHex("lightblue"))
    .setDescription(sniped.map(m => `**${sniped.indexOf(m) + 1}.** ${m.content} - <@${m.author}>`).join("\n"))
    msg.channel.send(embed)

      
    }

}
