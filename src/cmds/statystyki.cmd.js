const { MessageEmbed } = require("discord.js");
const { min } = require("moment");
const moment = require("moment");
const os = require('os');
module.exports = {
    name: "statystyki",
    description: "Wświetla statystyki bota.",
    aliases: ["stats", "staty"],
    category: "info",
    run(msg) {

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} dni, ${hours} godzin, ${minutes} minut`;


        if (totalSeconds < 60) {
            uptime = Math.round(totalSeconds) + " sekund(y)"
        } 
        if (totalSeconds < 3600 && totalSeconds > 60) {
            uptime = Math.round(minutes) + " minut(y)"
        } 
        if (totalSeconds < 21600 && totalSeconds > 3600) {
            uptime = Math.round(hours) + " godzin(y)"
        } 
       
        const embed = new MessageEmbed()
        .setTitle("Statystyki bota")
        .setColor("#00ff59")
       
        .addField("Liczba serwerów:", `\`${client.guilds.cache.size}\``, true)
        .addField("Liczba użytkowników:", `\`${client.users.cache.size}\``, true)
        .addField("Liczba kanałów:", `\`${client.channels.cache.filter(c => c.type === "text").size}\``, true)
        .addField(`Użycie ramu`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``, true)
        .addField(`Liczba komend:`, `\`${client.commands.size}\``, true)
        .addField(`Czas online`,  "`" + uptime + "`", true)
       
        
        msg.channel.send(embed);
        
    } }