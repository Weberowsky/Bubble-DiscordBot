const { MessageEmbed } = require("discord.js")
const f = require(__dirname + "/../functions.js")
const moment = require("moment")

module.exports = {
    name:"userinfo",
    description:"Wyświetla informacje o użytkowniku.",
    category: "tools",
    ussage: "[nick / część nicku / id / @wzmianka]",
    aliases: ["ui", "user"],
    

    run(msg, args) {

          const { channel, guild } = msg
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
        const { userprogramperms, userprogrampermstext } = f.userProgramPerms(1, user.user.id)
        let uspp = userprogramperms
        let usppt = userprogrampermstext
        if (user.user.id === client.user.id) {
            uspp = "∞"
            usppt = "Bubble"
        } else if (user.user.bot) {
            uspp = "0"
            usppt = "bot"
        }
          let isbot = ":man_gesturing_ok: Nie"
          if (user.user.bot) isbot = ":robot: Tak"
          const devices = msg.guild.member(user).presence.clientStatus;
                let onlineDevices = "";
                if (devices) {
                    if (devices.desktop) onlineDevices += "Komputera :desktop:, ";
                    if (devices.mobile) onlineDevices += "Telefonu :iphone:, ";
                    if (devices.web && !user.user.bot) {
                        onlineDevices += "Przeglądarki :globe_with_meridians:, ";
                    }
                    if (user.user.bot) onlineDevices += "API :robot:, ";
                }
                if (msg.guild.member(user).presence.status === "offline") onlineDevices = ":zzz: Jest offline"
                let status = "**:zzz: Offline / Niewidoczny**"
                if (msg.guild.member(user).presence.status === "online") status = ":green_circle: **Online**"
                if (msg.guild.member(user).presence.status === "dnd") status = ":no_entry: **Nie przeszkadzać**"
                if (msg.guild.member(user).presence.status === "idle") status = ":orange_circle: **Zaraz wracam**"

                 const states = []
        user.presence.activities.forEach((p) => {
            let state = ""
            if (p.type === "CUSTOM_STATUS") {
                state += "**Status własny:** "
                if(p.emoji) {
                    if (!p.emoji.id) {
                        state += p.emoji.name + " "
                    } else {
                        state += "[Custom emoji] "
                    }
                }
                state += p.state
            } else {
                if (p.type === "WATCHING") {
                    state += "**Ogląda** "
                    state += p.name
                } else if (p.type === "LISTENING") {
                    state += "**Słucha** "
                    state += p.name
                } else if (p.type === "PLAYING") {
                    state += "**W grze** "
                    state += p.name
                }
            }
            states.push(state)
        })
         moment.locale("pl")
        const m = moment(user.user.createdAt).format("LL")
        let roles = user.roles.cache.filter(r => r.name != "@everyone").map(r => `<@&${r.id}>`).join(", ")
        if (!roles) roles = "Brak"
        const embed = new MessageEmbed()
        if (user.roles.cache.filter(r => r.name != "@everyone").size < 1) {
            embed.setColor("#00FF59")
        } else {
            embed.setColor("#00FF59")
        }
        embed

        .setTitle(user.user.username)
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
        .addField("Nick na serwerze:", msg.guild.member(user).displayName)
        .addField("ID:", user.id)
        .addField("Status:", status + "\n" + states.join("\n"))
        .addField("Role na serwerze:", roles)
        .addField("Korzysta z discorda za pomocą:", onlineDevices )
        .addField("Konto utworzone:", m)
        .setFooter(`Wywołano przez: ${msg.author.username}`,  msg.author.displayAvatarURL())
        .addField("Odznaki:", "`Brak odznak`")
 
        
        channel.send(embed)
       

  }
    

    
}
