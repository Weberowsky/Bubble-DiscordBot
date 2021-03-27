const { MessageEmbed } = require('discord.js');
const f = require(__dirname + "/../functions.js")


module.exports = {
    name: "dm",
    description: "Wysyła wiadomość prywatną.",
devlvl: 2,
category: "dev",
ussage: "<@osoba> [wiadomosc]",
args: 2,
guildOnly: true,
disabled: true,

run(msg, args){
  if (!args[0].startsWith("<@") || !args[0].endsWith(">")) return msg.channel.send(`${f.customEmoji("no")} Nieprawidłowa @wzmianka.`)
    const user = msg.mentions.members.first()
    const content = [...args].slice(1).join(" ")
const embed = new MessageEmbed()
.setTitle('Od developerów')
.setDescription(content)
.setFooter('Wiadomość wysłana przez: ' + msg.author.username + ' | Bubble')
.setColor("#00FF59")
try {
  user.send(embed)
  msg.channel.send(`✅ Pomyślnie wysłano wiadomosć prywatną do użytkownika **${user.displayName}**!`)
  
const logs = new MessageEmbed()
.setTitle('Użyto komendy developerskiej')
.addField('Komenda: ', '`/dm`')
.addField('Treść', `\`${content}\``)


.setFooter('Od: ' + msg.author.username + ` | Do: ${user.displayName}`)
.setColor("#00FF59")
client.users.cache.get('532605336926814229').send(logs)

}
 catch(e) {


}
} }
