const { MessageEmbed, Permissions: {FLAGS} } = require("discord.js")
const f = require(__dirname + "/../functions.js")

module.exports = {
    name:"ban",
    description:"Banuje użytkownika z serwera.",
    category: "admin",
    guildOnly: true,
    args: 1,
    ussage: "<@osoba> [powód]",
    aliases: ["banuj", "zbanuj"],
    botPermissions: [FLAGS.BAN_MEMBERS],
    botTextPermissions: "banowanie członków",
    userPermissions: [FLAGS.BAN_MEMBERS],
    userTextPermissions: "banowanie członków",
    run(msg, args) {
       
        const user = msg.mentions.members.first()
        
        
        if (!args[0].startsWith("<@") || !args[0].endsWith(">")) return msg.channel.send(f.customEmoji("no") + " Nieprawidłowa @wzmianka.")
        
        if (user.id === client.user.id || user.id === msg.author.id) return msg.channel.send(f.customEmoji("no") + " Nie możesz zbanować siebie ani Bubble.")
        if (user.id === msg.guild.owner.id) return msg.channel.send(f.customEmoji("no") + " Nie możesz zbanować właściciela serwera.")
        if (msg.member.roles.highest.position <= user.roles.highest.position && msg.guild.owner.id != msg.author.id) return msg.channel.send("Nie możesz banować członków z taką samą lub wyższą rolą od Ciebie.")
        msg.channel.send(`${user} został zbanowany z serwera!`)
        const reason = [...args].slice(1).join(" ")
        let reasonText = "Brak"
        if (reason) reasonText = reason

        const embed = new MessageEmbed()
        .setTitle(msg.guild.name)
        .setDescription(`**Akcja:** Ban \n**Moderator:** <@${msg.author.id}> \n**Powód:** ${reasonText} \n**Czas:** :infinity:`)
        .setTimestamp()
        .setColor("#ff0000")
        try {
          user.send(embed)
          } catch(e) {
              msg.channel.send(f.customEMoji("no") + "  Bot nie może wysłać wiadomości do zbanowanego użytkownika. Prawdopodobnie że ma wyłączone wiadomości prywatne. Nie wpłynie to w żaden sposób na zbanowanie go z serwera.")
          }
        try {
          user.ban()
        } catch(e) {
            msg.channel.send(f.customEmoji("no") + "  Wystąpił błąd przy próbie zbanowanie tego członka serwera. Sprawdź, czy rola bota nie jest za nisko.")
        }
       
        
        
  }
    

    
}
