const { Permissions: { FLAGS } } = require("discord.js")
module.exports = {
    name: "mute",
    description: "Wycisza podanego użytkownika.",
    category: "admin",
    botPermissions: [FLAGS.MANAGE_ROLES],
    userPermissions: [FLAGS.MANAGE_ROLES],
    guildOnly: true,
    args: 1,
    devlvl: 3,
    ussage: "<osoba>",

    async run (msg, args) {
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
          
          if (!user) return msg.channel.send(f.customEmoji("no") + " Podaj prawidłową osobę (możliwe, że nie ma jej na tym serwerze).")
          if (user === msg.member || user === msg.guild.me) return(f.customEmoji("no") + " Nie możesz wyciszyć siebie ani bota.")
              if (user.id === msg.guild.owner.id) return msg.channel.send(f.customEmoji("no") + " Nie możesz wyciszyć właściciela serwera.")
        if (msg.member.roles.highest.position <= user.roles.highest.position && msg.guild.owner.id != msg.author.id) return msg.channel.send(f.customEmoji("no") + "Nie możesz wyciszać członków z taką samą lub wyższą rolą od siebie.")

          let muterole = msg.guild.roles.cache.find(r => r.name === "Wyciszony")
          
          if (!muterole) {
              msg.channel.send("Brak roli **Wyciszony**. Trwa jej tworzenie - proszę czekać...")
              muterole = await msg.guild.roles.create({
              data: {
                  name: "Wyciszony",
                  color: "BLACK",
                  mentionable: false,
                  hoist: false,
                  permissions: [],
              },
              reason: "Rola niezbędna do działania komendy ?mute",
          })
          msg.channel.send("Rola **Wyciszony** została stworzona.")
          const channels = []
          for (const c of msg.guild.channels.cache) {
              const channel = msg.guild.channels.cache.get(c[0])
              channels.push(channel)
          }
          channels.forEach((c) => {
              if (c.type === "category" || c.type === "text") {
                  c.updateOverwrite(muterole, {
                      SEND_MESSAGES: false,
                      SPEAK: false,
                  })
              } else if (c.type === "voice") {
                  c.updateOverwrite(muterole, {
                      SPEAK: false,
                  })
              }
          })
        }
        user.roles.add(muterole)
        msg.channel.send(`Pomyślnie wyciszono użytkownika <@${user.id}>.`)
    }
}