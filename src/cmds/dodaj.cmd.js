const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "dodaj",
    description: "Dodaj Bubble na serwer.",
    aliases: ["dodaj-bota"],
    category: "info",

    run(msg, args) {
        const embed = new MessageEmbed()
        .setTitle("Dodaj Bubble")
        .setDescription(`Dziękujemy za korzystanie z Bubble i zapraszamy do dodania go na nowy serwer!`)
        .addField("🛠 Dodaj bota", "[Kliknij](https://discord.com/api/oauth2/authorize?client_id=695700173317472265&permissions=8&scope=bot)")
        .addField("🌐 Strona internetowa", "[Kliknij](https://bubble.tk)")
        .addField("⭐ Polecane serwery", "[Przeglądaj](https://bubble.tk/top/explore.html)")
        .setColor('#00ff59')
        .setFooter(`Wywołano przez: ${msg.author.username}`,  msg.author.displayAvatarURL())

        msg.channel.send(embed)
    }
}
