const { MessageEmbed, Permissions: { FLAGS }, Collection } = require("discord.js")
const moment = require("moment")
const db = client.db


module.exports = {
  name: "giveaway",
  description: "Zarządza giveawayami.",
  category: "admin",
  aliases: ["giv"],
  guildOnly: true,
  args: 1,
  ussage: "<stworz (uruchamia kreator giveawaya) || usun (usuwa giveaway) || losuj (losuje ponownie giveawaya)>",
  async run(msg, args) {
    if ([undefined, null].includes(db.get(`${msg.guild.id}.giveaways`))) db.set(`${msg.guild.id}.giveaways`, {})
    moment.locale("pl")
    if (!["stworz", "usun", "losuj"].includes(args[0])) return msg.channel.send(f.customEmoji("bad") + " Wybierz poprawną opcję: \nstworz (uruchamia kreator giveawaya) | usun (usuwa giveaway) | losuj (losuje ponownie giveawaya)")
    if (args[0] === "stworz") {
      msg.channel.send("Uruchamiam kreator.")
      const embed = new MessageEmbed()
        .setColor(f.colorToHex("lightblue"))
        .setTitle("Kreator giveawaya")
        .setDescription("Na jaki kanał ma zostać wysłany giveaway? Możesz podać jego wzmiankę, id, nazwę lub jej część. Napisanie **pomiń**, wyśle giveaway na ten kanał.")
      const creatorMessage = await msg.channel.send(embed)
      let collected = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
        max: 1,
        time: 5 * 60 * 1000,
        errors: ["time"],
      }).catch(e => "error")
      if (collected === "error") {
        embed.setColor(f.colorToHex("red"))
        embed.setTitle("Kreator giveawaya - błąd")
        embed.setDescription("Nikt nie reagował przez 5 minut. Zamykam kreator.")
        return creatorMessage.edit(embed)
      }
      let message = collected.first()
      message.content = message.content.trim()
      const options = {}
      message.delete()
      if (message.content.toLowerCase() === "pomiń") {
        options.channel = message.channel
      } else {
        if (message.content.startsWith("<#") && message.content.endsWith(">")) {
          const channel = message.mentions.channels.first()
          options.channel = channel ? msg.guild.channels.cache.get(channel.id) : undefined
          if (!options.channel) {
            embed.setColor(f.colorToHex("red"))
              .setTitle("Kreator giveawaya - błąd")
              .setDescription(`Podany kanał (${message.content}) nie istnieje. Zamykam kreator.`)
            return creatorMessage.edit(embed)
          }
        } else {
          let channel = msg.guild.channels.cache.get(message.content)
          if (!channel) {
            const name = message.content.toLowerCase().replace(" ", "-")
            channel = msg.guild.channels.cache.find(c => c.name.toLowerCase() === name)
            if (!channel) channel = msg.guild.channels.cache.find(c => c.name.toLowerCase().includes(name))
          }
          if (!channel) {
            embed.setColor(f.colorToHex("red"))
              .setTitle("Kreator giveawaya - błąd")
              .setDescription(`Podany kanał (${message.content}) nie istnieje. Zamykam kreator.`)
            return creatorMessage.edit(embed)
          }

          if (!msg.guild.me.permissionsIn(channel).has([FLAGS.VIEW_CHANNEL, FLAGS.SEND_MESSAGES, FLAGS.ADD_REACTIONS])) {
            embed.setColor(f.colorToHex("red"))
              .setTitle("Kreator giveawaya - błąd")
              .setDescription(`Na podanym kanale (${message.content}) bot nie ma uprawnień: ${f.textPermissions([FLAGS.VIEW_CHANNEL, FLAGS.SEND_MESSAGES, FLAGS.ADD_REACTIONS])}. Zamykam kreator.`)
            return creatorMessage.edit(embed)
          }
          options.channel = channel
        }
      }


      embed.setDescription(`OK. Giveaway zostanie wysłany na ${options.channel}. Następne pytanie: O co ma się toczyć gra (czyli inaczej, nagroda)?`)
      creatorMessage.edit(embed)
      collected = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
        max: 1,
        time: 5 * 60 * 1000,
        errors: ["time"],
      }).catch(e => "error")

      if (collected === "error") {
        embed.setColor(f.colorToHex("red"))
        embed.setTitle("Kreator giveawaya - błąd")
        embed.setDescription("Nikt nie reagował przez 5 minut. Zamykam kreator.")
        return creatorMessage.edit(embed)
      }

      message = collected.first()
      message.content = message.content.trim()
      message.delete()
      if (message.content.length > 20) {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveaway - błąd")
          .setDescription(`Długość tytułu nagrody nie może być większa niż 20. Aktualna długość: **${message.content.length}**.`)
        return creatorMessage.edit(embed)
      }
      options.prize = message.content
      embed.setDescription(`Dobrze. Nagroda to **${options.prize}**. Jaki kolor embeda (czyli tego paska obok wiadomości) ma mieć giveaway? Podaj w hexie. Ustawienie **RANDOM** spowoduje ustawienie losowego, natomiast **pomiń** ustawi domyślny.`)
      creatorMessage.edit(embed)

      collected = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
        max: 1,
        time: 5 * 60 * 1000,
        errors: ["time"],
      }).catch(e => "error")
      if (collected === "error") {
        embed.setColor(f.colorToHex("red"))
        embed.setTitle("Kreator giveawaya - błąd")
        embed.setDescription("Nikt nie reagował przez 5 minut. Zamykam kreator.")
        return creatorMessage.edit(embed)
      }

      message = collected.first()
      message.content = message.content.trim()
      message.delete()

      if (message.content === "pomiń") {
        options.color = f.colorToHex("lightgreen")
      } else {
        options.color = message.content
      }
      embed.setColor(options.color)
      embed.setDescription("Dobrze. Kolor embeda będzie taki: \n:arrow_left: \nNastępne pytanie: Ilu będzie zwycięzców?")
      options.color = embed.color

      creatorMessage.edit(embed)

      collected = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
        max: 1,
        time: 5 * 60 * 1000,
        errors: ["time"],
      }).catch(e => "error")
      if (collected === "error") {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveawaya - błąd")
          .setDescription("Nikt nie reagował przez 5 minut. Zamykam kreator.")
        return creatorMessage.edit(embed)
      }

      message = collected.first()
      message.content = message.content.trim()
      message.delete()

      if (!Number.isInteger(Number(message.content)) || Number(message.content) < 0) {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveawaya - błąd")
          .setDescription(`Podana liczba nie jest liczbą całkowitą większą od 0. Zamykam kreator.`)

        return creatorMessage.edit(embed)
      }

      options.winers = Number(message.content)

      embed.setColor(f.colorToHex("lightblue"))
        .setDescription(`Super! Liczba zwycięzców to **${options.winers}**. Czy jakieś role nie mogą brać udziału w giveawayu? Akceptowana jest wzmianka, id, nazwa lub jej część. Jeżeli chcesz dodać kilka ról, oddziel je przecinkiem. Napisanie **pomiń** nie ustawi żadnej blacklisty.`)
      creatorMessage.edit(embed)

      collected = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
        max: 1,
        time: 5 * 60 * 1000,
        errors: ["time"],
      }).catch(e => "error")
      if (collected === "error") {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveawaya - błąd")
          .setDescription("Nikt nie reagował przez 5 minut. Zamykam kreator.")
        return creatorMessage.edit(embed)
      }

      message = collected.first()
      message.content = message.content.trim()
      message.delete()

      if (message.content === "pomiń") {
        options.blacklist = []
      } else {
        if (message.content.replace(" , ", ",").includes(",")) {
          const args = message.content.replace(" , ", ",").split(",")
          const roles = []
          args.forEach((e, i) => {
            let role = null
            if (e.startsWith("<@&") && e.endsWith(">")) {
              role = message.mentions.roles.array[i]
            } else {
              role = msg.guild.roles.cache.get(message.content)
              if (!role) {
                const name = e.toLowerCase()
                role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === name)
                if (!role) role = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes(name))
              }
            }
            roles.push(role)

          })
          if (roles.filter(r => r === undefined).length) {
            embed.setColor(f.colorToHex("red"))
              .setTitle("Kreator giveawaya - błąd")
              .setDescription(`Jedna z podanych ról nie istnieje nie istnieje. Zamykam kreator.`)
            return creatorMessage.edit(embed)
          }
          options.blacklist = roles
        } else {
          let role = null
          if (message.content.startsWith("<@&") && message.content.endsWith(">")) {
            role = message.mentions.roles.first()
            if (!role) {
              embed.setColor(f.colorToHex("red"))
                .setTitle("Kreator giveawaya - błąd")
                .setDescription(`Podana rola (${message.content}) nie istnieje. Zamykam kreator.`)
              return creatorMessage.edit(embed)
            }
          } else {
            role = msg.guild.roles.cache.get(message.content)
            if (!role) {
              const name = message.content.toLowerCase()
              role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === name)
              if (!role) role = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes(name))
            }
            if (!role) {
              embed.setColor(f.colorToHex("red"))
                .setTitle("Kreator giveawaya - błąd")
                .setDescription(`Podana rola (${message.content}) nie istnieje. Zamykam kreator.`)
              return creatorMessage.edit(embed)
            }

          }
          options.blacklist = [role]
        }


      }
      embed.setDescription(`Jasne. Te role nie będą mogły brać udziału w giveawayach: ${options.blacklist.length > 0 ? f.betterjoin(options.blacklist) : "**Brak**"}. Ile czasu ma trwać giveaway (format: \`<ilość><jednostka czasu>\`)?. Akceptowane jednostki czasu: \`m\` (minuta), \`h\` (godzina), \`d\` dzień, \`w\` (tydzień) i \`mt\` (miesiąc).`)
      creatorMessage.edit(embed)

      collected = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
        max: 1,
        time: 5 * 60 * 1000,
        errors: ["time"],
      }).catch(e => "error")
      if (collected === "error") {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveawaya - błąd")
          .setDescription("Nikt nie reagował przez 5 minut. Zamykam kreator.")
        return creatorMessage.edit(embed)
      }

      message = collected.first()
      message.content = message.content.trim()
      message.delete()

      const parsedTime = f.timeToMs(message.content)
      if (parsedTime.status === "error") {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveawaya - błąd")
          .setDescription(parsedTime.message + ". Zamykam kreator.")
        return creatorMessage.edit(embed)
      }
      options.time = parsedTime.amount

      embed.setDescription(`Dobrze. Giveaway będzie trwał **${parsedTime.description}**. Czy jakieś role mają zostać dodane po wygraniu giveawaya? Napisanie **pomiń** nie ustawi żadnych ról do dodania.`)
      creatorMessage.edit(embed)


      collected = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
        max: 1,
        time: 5 * 60 * 1000,
        errors: ["time"],
      }).catch(e => "error")
      if (collected === "error") {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveawaya - błąd")
          .setDescription("Nikt nie reagował przez 5 minut. Zamykam kreator.")
        return creatorMessage.edit(embed)
      }

      message = collected.first()
      message.content = message.content.trim()
      message.delete()

      if (message.content === "pomiń") {
        options.roleGiven = []
      } else {
        if (message.content.replace(" , ", ",").includes(",")) {
          const args = message.content.replace(" , ", ",").split(",")
          const roles = []
          args.forEach((e, i) => {
            let role = null
            if (e.startsWith("<@&") && e.endsWith(">")) {
              role = message.mentions.roles.array[i]
            } else {
              role = msg.guild.roles.cache.get(e)
              if (!role) {
                const name = e.toLowerCase()
                role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === name)
                if (!role) role = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes(name))
              }
            }
            roles.push(role)

          })
          if (roles.filter(r => r === undefined).length) {
            embed.setColor(f.colorToHex("red"))
              .setTitle("Kreator giveawaya - błąd")
              .setDescription(`Jedna z podanych ról nie istnieje nie istnieje. Zamykam kreator.`)
            return creatorMessage.edit(embed)
          }
          options.roleGiven = roles
        } else {
          let role = null
          if (message.content.startsWith("<@&") && message.content.endsWith(">")) {
            role = message.mentions.roles.first()
            if (!role) {
              embed.setColor(f.colorToHex("red"))
                .setTitle("Kreator giveawaya - błąd")
                .setDescription(`Podana rola (${message.content}) nie istnieje. Zamykam kreator.`)
              return creatorMessage.edit(embed)
            }
          } else {
            role = msg.guild.roles.cache.get(message.content)
            if (!role) {
              const name = message.content.toLowerCase()
              role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === name)
              if (!role) role = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes(name))
            }
            if (!role) {
              embed.setColor(f.colorToHex("red"))
                .setTitle("Kreator giveawaya - błąd")
                .setDescription(`Podana rola (${message.content}) nie istnieje. Zamykam kreator.`)
              return creatorMessage.edit(embed)
            }

          }
          options.roleGiven = [role]
        }
      }
      if (options.roleGiven.length > 0 && options.roleGiven.some(e => msg.guild.me.roles.highest.comparePositionTo(e) < 0)) {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveawaya - błąd")
          .setDescription("Jedna z ról do dodania ma wyższą pozycję niż najwyższa rola bota.")
        return creatorMessage.edit(embed)
      }

      embed.setDescription(`Ok. Te role zostaną dodane po wygraniu giveawaya: ${options.roleGiven.length > 0 ? f.betterjoin(options.roleGiven) : "**Brak**"}. Czy jakieś role mają zostać zabrane po wygraniu giveawaya? Napisanie **pomiń** nie ustawi żadnych ról do zabrania.`)
      creatorMessage.edit(embed)

      collected = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
        max: 1,
        time: 5 * 60 * 1000,
        errors: ["time"],
      }).catch(e => "error")
      if (collected === "error") {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveawaya - błąd")
          .setDescription("Nikt nie reagował przez 5 minut. Zamykam kreator.")
        return creatorMessage.edit(embed)
      }

      message = collected.first()
      message.content = message.content.trim()
      message.delete()

      if (message.content === "pomiń") {
        options.roleTaken = []
      } else {
        if (message.content.replace(" , ", ",").includes(",")) {
          const args = message.content.replace(" , ", ",").split(",")
          const roles = []
          args.forEach((e, i) => {
            let role = null
            if (e.startsWith("<@&") && e.endsWith(">")) {
              role = message.mentions.roles.array()[i]
            } else {
              role = msg.guild.roles.cache.get(message.content)
              if (!role) {
                const name = e.toLowerCase()
                role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === name)
                if (!role) role = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes(name))
              }
            }
            roles.push(role)

          })
          if (roles.filter(r => r === undefined).length) {
            embed.setColor(f.colorToHex("red"))
              .setTitle("Kreator giveawaya - błąd")
              .setDescription(`Jedna z podanych ról nie istnieje nie istnieje. Zamykam kreator.`)
            return creatorMessage.edit(embed)
          }
          options.roleTaken = roles
        } else {
          let role = null
          if (message.content.startsWith("<@&") && message.content.endsWith(">")) {
            role = message.mentions.roles.first()
            if (!role) {
              embed.setColor(f.colorToHex("red"))
                .setTitle("Kreator giveawaya - błąd")
                .setDescription(`Podana rola (${message.content}) nie istnieje. Zamykam kreator.`)
              return creatorMessage.edit(embed)
            }
          } else {
            role = msg.guild.roles.cache.get(message.content)
            if (!role) {
              const name = message.content.toLowerCase()
              role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === name)
              if (!role) role = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes(name))
            }
            if (!role) {
              embed.setColor(f.colorToHex("red"))
                .setTitle("Kreator giveawaya - błąd")
                .setDescription(`Podana rola (${message.content}) nie istnieje. Zamykam kreator.`)
              return creatorMessage.edit(embed)
            }

          }
          options.roleTaken = [role]
        }
      }
      if (options.roleTaken.length > 0 && options.roleTaken.some(e => msg.guild.me.roles.highest.comparePositionTo(e)) < 1) {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveawaya - błąd")
          .setDescription("Jedna z ról do zabrania ma wyższą pozycję niż najwyższa rola bota.")
        return creatorMessage.edit(embed)
      }
      if (!options.blacklist) options.blacklist = []
      if (!options.roleGiven) options.roleGiven = []
      if (!options.roleTaken) options.roleTaken = []

      embed.setColor(options.color)
        .setDescription(`Ok. Oto parametry giveawaya. Jeżeli wszystko się zgadza, zareaguj ${f.customEmoji("tak")}.`)
        .addField("Kanał:", options.channel)
        .addField("Nagroda:", options.prize)
        .addField("Liczba zwycięzców:", options.winers)
        .addField("Role, które nie mogą brać udziału w giveawayu:", options.blacklist.length > 0 ? f.betterjoin(options.blacklist) : "Brak")
        .addField("Czas trwania:", parsedTime.description)
        .addField("Role dodane po wygraniu giveawaya:", options.roleGiven.length > 0 ? f.betterjoin(options.roleGiven) : "Brak")
        .addField("Role zabrane po wygraniu giveawaya:", options.roleTaken.length > 0 ? f.betterjoin(options.roleTaken) : "Brak")
      creatorMessage.edit(embed)
      await creatorMessage.react(f.customEmoji("tak"))
      await creatorMessage.react(f.customEmoji("nie"))
      collected = await creatorMessage.awaitReactions((reaction, user) => user.id === msg.author.id && ["tak", "nie"].includes(reaction.emoji.name), {
        time: 5 * 60 * 1000,
        max: 1,
        errors: ["time"],
      }).catch(e => "error")
      creatorMessage.reactions.removeAll()
      if (collected === "error") {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveawaya - błąd")
          .setDescription("Nikt nie reagował przez 5 minut. Zamykam kreator.")
        return creatorMessage.edit(embed)
      }
      if (collected.first().emoji.name === "tak") {

        const giveaways = Object.keys(db.get(`${msg.guild.id}.giveaways`)).sort((a, b) => a - b).map(e => Number(e))
        const giveawayId = giveaways.length ? giveaways[giveaways.length - 1] + 1 : 0
        const timeEnd = Date.now() + options.time
        embed.setColor(f.colorToHex("lightgreen"))
          .setTitle("Kreator giveawaya - sukces")
          .setDescription("Pomyślnie zakończono tworzenie giveawaya. Trwa wysyłanie...")
        creatorMessage.edit(embed)
        const givEmbed = new MessageEmbed()
          .setTitle("Giveaway")
          .setColor(options.color)
          .setDescription("Zareaguj :tada:, aby wziąć udział w giveawayu.")
          .addField("Organizator:", msg.member.toString())
          .addField("Role, które nie mogą brać udziału w giveawayu:", options.blacklist.length > 0 ? f.betterjoin(options.blacklist) : "Brak")
          .addField("Nagroda:", options.prize)
          .addField("Role, które zostaną dodane po wygraniu:", options.roleGiven.length > 0 ? f.betterjoin(options.roleGiven) : "Brak")
          .addField("Role, które zostaną zabrane po wygraniu:", options.roleTaken.length > 0 ? f.betterjoin(options.roleTaken) : "Brak")
          .addField("Giveaway rozpoczął się:", moment(new Date()).format("DD MMMM (dddd) YYYY r. HH:mm:ss"))
          .addField("Giveaway zakończy się:", moment(new Date(timeEnd)).format("DD MMMM (dddd) YYYY r. HH:mm:ss"))
          .setFooter("Id giveawya: " + giveawayId)

        const givMessage = await options.channel.send(givEmbed)
        givMessage.react("🎉")
        db.set(`${msg.guild.id}.giveaways.${giveawayId}`, {
          timeEnd,
          winers: options.winers,
          prize: options.prize,
          blacklist: options.blacklist,
          organizer: msg.author.id,
          roleGiven: options.roleGiven,
          roleTaken: options.roleTaken,
          channel: options.channel.id,
          message: givMessage.id,
          active: true
        })
        setTimeout(async () => {
          db.set(`${msg.guild.id}.giveaways.${giveawayId}.active`, false)
          const toWin = msg.guild.members.cache.filter(m => givMessage.reactions.cache.get("🎉").users.cache.filter(u => !u.bot).map(u => u.id).includes(m.user.id) && !options.blacklist.some(b => m.roles.cache.has(b)))
          const members = toWin.random(options.winers).length > 0 ? toWin.random(options.winers) : ["Brak"]
          const deleted = await givMessage.reactions.cache.get("🎉").remove().catch(e => {
            if (e.toString().slice("DiscordAPIError: ".length) === "Unknown Message") return true
            return false
          })
          if (deleted === true) {
            const errorEmbed = new MessageEmbed()
              .setColor(f.colorToHex("red"))
              .setTitle("Giveaway - błąd")
              .setDescription("Wiadomość z giveawayem została skasowana.")
            db.delete(`${msg.guild.id}.giveaways.${giveawayId}`)
            return givMessage.channel.send(errorEmbed)
          }
          givEmbed.setTitle("Giveaway - zakończono")
            .setDescription("Giveaway się zakończył.")
            .spliceFields(1, 1)
            .spliceFields(2, 4)
            .addField("Zwycięzcy:", f.betterjoin(members.map(m => !m ? "Brak" : m.toString())))
            .addField("Giveaway zakończył się:", moment(new Date(timeEnd)).format("DD MMMM (dddd) YYYY r. HH:mm:ss"))
          givMessage.edit(givEmbed)

          if (members[0] === "Brak") {
            const endMessage = await givMessage.channel.send(msg.member.toString())
            const endEmbed = new MessageEmbed()
              .setColor(f.colorToHex("red"))
              .setTitle("Giveaway - błąd")
              .setDescription(`Nikt nie wziął udziału w [giveawayu](${givMessage.url}). ~~Może nikt nie chciał nagrody.~~`)
            db.delete(`${msg.guild.id}.giveaways.${giveawayId}`)
            return endMessage.edit("", endEmbed)
          } else {
            const endEmbed = new MessageEmbed()
              .setColor(f.colorToHex("lightgreen"))
              .setDescription(`[Giveaway](${givMessage.url}) się zakończył.`)

            const endMessage = await givMessage.channel.send(msg.member.toString() + ", " + f.betterjoin(members.filter(e => e)))
            endMessage.edit("", endEmbed)
            members.filter(e => e).forEach(m => {
              options.roleGiven.forEach(async (r) => await m.roles.add(r).catch(e => msg.author.send(`Użytkownik **${m.displayName}** wygrał, ale nie mogłem mu nadać roli **${r.name}**.`)))
              options.roleTaken.forEach(async (r) => await m.roles.remove(r).catch(e => msg.author.send(`Użytkownik **${m.displayName}** wygrał, ale nie mogłem mu zabrać roli **${r.name}**.`)))
            })

          }
          if (options.roleGiven && options.roleTaken) db.set(`${msg.guild.id}.giveaways.${giveawayId}.winMembers`, members)
          db.set(`${msg.guild.id}.giveaways.${giveawayId}.members`, toWin.map(m => m.user.id))
          setTimeout(() => db.delete(`${msg.guild.id}.giveaways.${giveawayId}`), 24 * 60 * 60 * 1000)
        }, options.time)
      } else {
        embed.setColor(f.colorToHex("red"))
          .setTitle("Kreator giveawaya - przerwano")
          .setDescription("Przerwano tworzenie giveawaya.")
        creatorMessage.edit(embed)
      }


    } else if (args[0] === "losuj") {
      if (!args[1]) return msg.channel.send(`${f.customEmoji("bad")} Nie podano id giveawayu do ponownego wylosowania.`)
      const giv = db.get(`${msg.guild.id}.giveaways.${args[1]}`) || null
      if (giv === null) return msg.channel.send(`${f.customEmoji("bad")} Nie znaleziono giveawayu o podanym id (możliwe, że minęło już 24 godziny od pierwszego wylosowania lub za pierwszym razem nikt nie wziął w nim udziału).`)
      const members = new Collection()
      giv.members.forEach(m => members.set(m, msg.guild.members.cache.get(m)))
      const givMsg = await msg.guild.channels.cache.get(giv.channel).messages.fetch(giv.message)
      const win = members.random(giv.winers)
      console.log(win[0].displayName)
      if (giv.roleTaken.length || giv.roleGiven.length) {
        giv.winMembers.filter(e => typeof (e) != "string" && !win.filter(m => m).some(m => m.user.id === e.userID)).forEach(e => {
          e = msg.guild.members.cache.get(e.userID)
          if (giv.roleGiven.length) giv.roleGiven.forEach(r => e.roles.remove(r))
          if (giv.roleTaken.length) giv.roleTaken.forEach(r => e.roles.add(r))
        })
        win.filter(e => e && typeof e != "string" && !giv.winMembers.some(m => e.user.id === m.userID)).forEach(e => {
          if (giv.roleGiven.length) giv.roleGiven.forEach(r => e.roles.add(r))
          if (giv.roleTaken.length) giv.roleTaken.forEach(r => e.roles.remove(r))
        })
        db.set(`${msg.guild.id}.giveaways.${args[1]}.winMembers`, win.map(e => e ? e.user.id : undefined))
        const givEmbed = new MessageEmbed()
          .setColor(f.colorToHex("lightgreen"))
          .setTitle("Giveaway - zakończono")
          .setDescription("Giveaway się zakończył.")
          .addField("Organizator:", "<@" + giv.organizer + ">")
          .addField("Nagroda:", giv.prize)
          .addField("Zwycięzcy:", f.betterjoin(win.map(m => !m ? "Brak" : m.toString())))
          .addField("Giveaway zakończył się:", moment(new Date(giv.timeEnd)).format("DD MMMM (dddd) YYYY r. HH:mm:ss"))
          .setFooter(`Id giveawaya: ${args[1]}`)

        await givMsg.edit(givEmbed)

        const sendEmbed = new MessageEmbed()
          .setColor(f.colorToHex("lightgreen"))
          .setDescription(`Wylosowano nowych zwycięzców [giveawaya](${givMsg.url})`)

        const sendMsg = await givMsg.channel.send(f.betterjoin(win.map(e => e ? e.toString() : "Brak")))
        await sendMsg.edit("", sendEmbed)
      }
    } else if (args[0] === "usun") {
      if (!args[1]) return msg.channel.send(`${f.customEmoji("bad")} Nie podano id giveawayu do ponownego wylosowania.`)
      const giv = db.get(`${msg.guild.id}.giveaways.${args[1]}`) || null
      if (giv === null) return msg.channel.send(`${f.customEmoji("bad")} Nie znaleziono giveawayu o podanym id (możliwe, że minęło już 24 godziny od pierwszego wylosowania lub za pierwszym razem nikt nie wziął w nim udziału).`)
      db.delete(`${msg.guild.id}.giveaways.${args[1]}`)
      msg.channel.send("Skasowano giveaway.")
    }
  }
}
