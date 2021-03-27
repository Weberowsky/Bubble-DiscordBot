const db = client.db
const { MessageEmbed, Permissions: {FLAGS} } = require("discord.js")

module.exports = {
    name: "snipe-clear",
    description: "Usuwa listę snipe",
    category: "tools",
    userPermissions: [FLAGS.ADMINISTRATOR],
    userTextPermissions: "administrator",
    aliases: ["clear-snipe", "snipe-delete"],
    
    run (msg) {
      
        db.delete(`${msg.guild.id}.snipe.${msg.channel.id}`)
        const embed = new MessageEmbed()
        .setTitle(`Usunięto listę wiadomości`)
        .setDescription(f.customEmoji('love') + ` Pomyślnie wyczyszczono listę ostatnio usuniętych wiadomości. `)
        .setFooter(`Moderator: ${msg.author.tag}`, msg.author.displayAvatarURL())
        .setColor(f.colorToHex('lightblue'))
        msg.channel.send(embed)
    }
}
