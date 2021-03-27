const { MessageEmbed, Permissions: {FLAGS} } = require("discord.js")
const f = require(__dirname + "/../functions.js")
module.exports = {
    name:"serverinfo",
    description:"Wyświetla informacje o serwerze.",
    aliases: ["si", "server", "sinfo"],
    botPermissions: [FLAGS.BAN_MEMBERS],
    botTextPermissions: "banowanie członków",
    category: "tools",
    guildOnly: true,
    run(msg) {
        
        if (true) {
          msg.guild.fetchBans()
        .then(bans => {
          let verifyLevels = ["Wyłączona", "Niski", "Średni", "Wysoki", "Bardzo wysoki"]
        const { guild, channel } = msg
        const region = guild.region
        .replace("brasil", "Brazylia")
        .replace("europe", "Europa")
        .replace("hongkong", "Hong Kong")
        .replace("india", "Indie")
        .replace("japan", "Japonia")
        .replace("russia", "Rosja")
        .replace("singapore", "Singapur")
        .replace("southafrica", "Afryka Południowa")
        .replace("sydney", "Sydnej")
        .replace("uscentral", "Ameryka Środkowa")
        .replace("useast", "Ameryka Wschodnia")
        .replace("ussouth", "Ameryka Południowa")
        .replace("uswest", "Ameryka Zachodnia")

        const verlvl = 0
        if (guild.verificationLeve === "LOW") verlvl = 1
        if (guild.verificationLeve === "MEDIUM") verlvl = 2
        if (guild.verificationLevel === "HIGH") verlvl = 3
        if (guild.verificationLevel === "VERY_HIGH") verlvl = 4
        const embed = new MessageEmbed()
        .setColor(`#00ff59`)
        .setTitle(guild.name)
        .setThumbnail(guild.iconURL())
        .addField("ID serwera:", `:mailbox: ${guild.id}`)
        .addField("Właściciel:", `:crown: <@${guild.owner.id}>`)
        .addField("Członkowie:", `:busts_in_silhouette: Razem: ${guild.members.cache.size} \n:man_gesturing_ok: Osób: ${guild.members.cache.filter(member => !member.user.bot).size} \n:robot: Botów: ${guild.members.cache.filter(member => member.user.bot).size}`)
      
        .addField("Liczba kanałów:", `:open_file_folder: Razem: ${guild.channels.cache.filter(channel => channel.type === "text" || channel.type === "voice").size} \n:hash: Tekstowych: ${guild.channels.cache.filter(channel => channel.type === "text").size} \n :speaker: Głosowych: ${guild.channels.cache.filter(channel => channel.type === "voice").size}`)
        .addField("Liczba ról:", `:trophy: Role: ${guild.roles.cache.size}`)
        .addField("Liczba emoji:", `😂 ${guild.emojis.cache.size}`)
        .addField("Liczba banów:", `:no_entry: ${bans.size}`)
        .addField("Poziom weryfikacji:", `:lock: ${verifyLevels[verlvl]}` )
        .setTimestamp()

          if (msg.guild.id == '793613869695762513') {
            embed.addField("Ulepszenia", "`💎 Premium (do 30.01.2021)`")
          }

        msg.channel.send(embed)
        }) 
      }
       

  }
    

    
}
