const { MessageEmbed, Permissions: {FLAGS} } = require("discord.js")
const f = require(__dirname + "/../functions.js")

module.exports = {
    name:"kick",
    description:"Wyrzuca użytkownika z serwera.",
    category: "admin",
    guildOnly: true,
    args: 1,
    ussage: "<@osoba> [powód]",
    aliases: ["wyrzuc", "kopnij"],
    botPermissions: [FLAGS.KICK_MEMBERS],
    botTextPermissions: "wyrzucanie członków",
    userPermissions: [FLAGS.KICK_MEMBERS],
    userTextPermissions: "wyrzucanie członków",
    run(msg, args) {
        if (!args[0].startsWith("<@") || !args[0].endsWith(">")) return msg.channel.send("<:no:716381166030290984> Nieprawidłowa @wzmianka.")
        const user = msg.mentions.members.first()
        if (!user) return msg.channel.send(f.customEmoji("no") + " Podaj prawidłową osobę (możliwe, że nie ma jej na tym serwerze).")
        
        
        
        if (user.id === client.user.id || user.id === msg.author.id) return msg.channel.send(f.customEmoji("no") + " Nie możesz wyrzucać siebie ani bota.")
        if (user.id === msg.guild.owner.id) return msg.channel.send(f.customEmoji("no") + " Nie możesz wyrzucać właściciela serwera.")
        if (msg.member.roles.highest.position <= user.roles.highest.position && msg.guild.owner.id != msg.author.id) return msg.channel.send(f.customEmoji("no") + "Nie możesz wyrzucać członków z wyższą rolą od siebie.")
   

        const reason = [...args].slice(1).join(" ")
        let reasonText = "Brak"
        if (reason) reasonText = reason
   
        const kicked = new MessageEmbed()
        .setTitle("Wyrzucono członka serwera")
        .setDescription(`**${user}** został pomyślnie wyrzucony z serwera!\nPowód: \`${reason}\``)
        .setFooter(`Moderator: ${msg.author.username}`, msg.author.displayAvatarURL())
        .setTimestamp()
        .setColor("#ff0000")
      msg.channel.send(kicked)

        const embed = new MessageEmbed()
        .setTitle(msg.guild.name)
        .setDescription(`**Akcja:** kick \n **Moderator:** <@${msg.author.id}> \n**Powód:** ${reasonText} \n**Czas:** nie dotyczy`)
        .setColor("#ff0000")

        try {
          user.send(embed)
          } catch(e) {
              msg.channel.send(f.customEmoji("no") + " Wygląda na to, że bot z jakiegoś nie mógł napisać do podanego użytkownika. Możliwe,że ma wyłączone wiadomości prywatne.  Nie wpłynie to w żadny sposób na wyrzucenie go z serwera.")
          }
        try {
          user.kick(reasonText)
        } catch(e) {
            msg.channel.send(f.customEmoji("no") + " Wygląda na to, że bot z jakiegoś powodu nie mógł wyrzucić tego użytkownika. Może rola bota jest za nisko?")
        }
       
        
        
  }
    

    
}
