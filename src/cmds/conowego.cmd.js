const { Client, MessageEmbed } = require("discord.js")
const { Botlastupdate, Botversion, Botnews } = require(__dirname + "/../config/informations.js")

module.exports = {
    name:"nowosci",
    description:"Pokazuje nowości z ostatniego updatu.",
    category: "tools",
    aliases:["conowego", "news", "lastupdate"],
    run(msg) {
        const embed = new MessageEmbed()
        .setTitle("Ostatni update")
        .setColor("#00FF59")
        .addField("Wersja:", Botversion)
        .addField("Aktualizacja z dnia:", Botlastupdate)
        .addField("Zmiany / Nowości:", Botnews)
        .addField("Polecane serwery:", "[Zobacz](https://bubble.tk/top/explore.html)")
        .setFooter(`Wywołano przez: ${msg.author.username}`,  msg.author.displayAvatarURL())
    msg.channel.send(embed)
    }

    
}