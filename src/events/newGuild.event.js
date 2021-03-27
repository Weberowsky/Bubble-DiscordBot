const { MessageEmbed } = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "guildCreate",

    run(guild) {
       
        client.user.setActivity(`@Bubble || ${client.guilds.cache.size} serwerów`, { type: "WATCHING" })
        if (!db.get(guild.id)) db.set(guild.id, {})
        guild.prefix = db.get(guild.id + ".prefix") ? db.get(guild.id + ".prefix") : client.prefix
        const embed = new MessageEmbed()
.setTitle("Hej!")
        .setDescription("Hej! Dzięki za dodanie mnie na ten serwer!")
        .addField("Prefix:", `\`${guild.prefix}\``, true)
        .addField("Komenda pomocy:", `\`${guild.prefix}pomoc\``, true)
        .addField("Serwer pomocy:", "[Dołącz](https://discord.gg/3T2nfgk2BQ)", true)
        .setColor("#01f482")

        guild.systemChannel.send(embed)
    }
} 
