const { MessageEmbed } = require("discord.js")
const db = client.db

module.exports = {
    name: "snipe",
    description: "Pokazuje ostatnio skasowane wiadomości",
    aliases: ["odkasuj", "sn"],
    guildOnly: true,
    category: "fun",
    
    async run (msg) {
        const rom1 = await db.get(`${msg.guild.id}.snipe`)
        const nosnipe = "Na tym kanale nie znajdują się żadne usunięte wiadomości. Mogły zostać automatycznie usunięte, ponieważ było ich za dużo, lub zostały celowo usunięte żeby ukryć jakieś sekrety :smirk:"
        if (!rom1) return msg.channel.send(nosnipe)
        if (!await db.get(`${msg.guild.id}.snipe.${msg.channel.id}`)) return msg.channel.send(nosnipe)
        if (await db.get(`${msg.guild.id}.snipe.${msg.channel.id}`).length < 1) return msg.channel.send(nosnipe)

        const sniped = await db.get(`${msg.guild.id}.snipe.${msg.channel.id}`).reverse()
        const embed = new MessageEmbed()
        .setTitle("Usunięte wiadomości")
        .setColor(f.colorToHex("lightblue"))
        .setDescription(sniped.map(m => `**${sniped.indexOf(m) + 1}.** ${m.content} ~ <@${m.author}>`).join("\n"))
        msg.channel.send(embed)
    }
}
