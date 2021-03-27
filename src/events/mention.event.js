const { MessageEmbed } = require("discord.js");
const db = client.db

module.exports = {
    name: "message",

    async run(message) {
        const prefix = await db.get(message.guild.id + ".prefix")
        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(prefixMention) && !message.author.bot) {
        const embed = new MessageEmbed()
        .setTitle(`Hej, ${message.author.username}!`)
        .setDescription(`Mój prefix na tym serwerze to \`${prefix}\`.\n Użyj komendy pomocy \`${prefix}pomoc\`, aby uzyskać listę komend bota.`)
     
        .addField("<:webpage:815279106756968448>" + " Strona internetowa:", "[Odwiedź](https://bubble.tk)", true)
        .addField(f.customEmoji('question') + " Serwer support:", "[Dołącz](https://discord.gg/dGwK7YzUPx)", true)
        
        .setColor("#00ff77")
        
        message.channel.send(embed)
    }
}

}
