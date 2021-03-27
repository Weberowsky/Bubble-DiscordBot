const { MessageEmbed, Permissions: {FLAGS} } = require("discord.js")
const f = require(__dirname + "/../functions.js")

module.exports = {
    name: "say",
    description: "Wysyła wiadomość podaną przez użytkownika.",
    category: "fun",
    args: 1,
    ussage: "<tekst>",

    run(msg, args) {
     
           msg.delete()
           const text = args.join(" ")
           if (text.length > 250) return msg.channel.send(f.customEmoji('bad') + ` Liczba znaków w tekście nie może przekraczać **250** znaków. Liczba znaków w twoim tekście: **${text.length}**`)
           
       
           const say = new MessageEmbed()
           .setTitle('Wiadomość')
           .setColor('#00ff59')
           .setDescription(text)
           .setFooter(`Wywołano przez: ${msg.author.username}`)
           msg.channel.send(say)
      
} }