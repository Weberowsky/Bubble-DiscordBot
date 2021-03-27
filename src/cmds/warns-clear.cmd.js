const { Permissions: { FLAGS }, MessageEmbed } = require("discord.js");
const f = require(__dirname + "/../functions.js") 
const db = require("quick.db");

module.exports = {
    name: "warns-clear",
    description: "Usuwa ostrzeżenia,",
    category: "admin",
    guildOnly: true,
    args: 1,
    ussage: ["@użytkownik <powód>"],
    userPermissions: [FLAGS.ADMINISTRATOR],
    userTextPermission: "administartor",

   async run(msg, args) {

let user = msg.mentions.members.first()
  let reason = [...args].slice(1).join(" ")
  const { guild, channel } = msg
      const servername = guild.name
      const mod = msg.author.username
      const prefix = db.fetch(`prefix_${msg.guild.id}`)

        if (!args[0].startsWith("<@") || !args[0].endsWith(">")) return msg.channel.send("<:no:720709627125170307> Nieprawidłowa @wzmianka.")
        
        
        if (!msg.guild) return
        if (msg.author.bot) return
        if (!db.get(msg.guild.id + ".warns")) db.set(msg.guild.id + ".warns", {})
        if (!db.get(`${msg.guild.id}.warns.${user.user.id}`)) db.set(`${msg.guild.id}.warns.${user.user.id}`, [])
        
        db.delete(`${msg.guild.id}.warns.${user.user.id}`, {
            
        })
    

       
if (reason === "") {
  reason = "Brak"
}
        const warnik = new MessageEmbed()
        .setTitle(`Usunięto ostrzeżenia`)
        .setDescription(`Pomyślnie usunięto ostrzeżenia użytkownika użytkownika **${user}** z powodu: **${reason}**`)
        .setColor(`#ff0000`)
        .setTimestamp()
        .setFooter(`Administrator: ${msg.author.username}`, msg.author.displayAvatarURL())
        msg.channel.send(warnik)
     

        const pv = new MessageEmbed()
        .setTitle('Twoje ostrzeżenie zostały usunięte!')
      .addField('Nazwa serwera', servername)
      .addField('Moderator', mod)
      .addField('Powód', reason)
      .setColor(`#ff0000`)
      .setTimestamp()
      .setFooter(`Od teraz liczba Twoich ostrzeżeń wynosi 0`, user.user.displayAvatarURL())
      user.send(pv)
    }

}