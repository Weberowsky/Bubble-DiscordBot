const { MessageEmbed, Permissions: {FLAGS} } = require("discord.js")
const db = client.db
const f = require(__dirname + "/../functions.js")

module.exports = {
    name: "remove",
    description: "Odejmuje monety uzytkownikowi.",
    category: "economy",
    guildOnly: true,
    aliases: ["zabierz", "usuń monety"],
    usage: "@użytkownik <liczba moent>",
    userPermissions: [FLAGS.ADMINISTRATOR],
    userTextPermission: "administartor",

    async run(msg, args) {

        let user = msg.mentions.members.first() || msg.author;

        if (isNaN(args[1])) return;
        db.subtract(`money_${msg.guild.id}_${user.id}`, args[1])
        let bal = await db.fetch(`money_${msg.guild.id}_${user.id}`)
    
        const moneyEmbed = new MessageEmbed()
        .setTitle('Usunięto monety')
        .setColor("#14f52b")
        .setDescription(f.customEmoji("yes") + ` Pomyślnie usunięto ** ${args[1]} ** monet uzytkownikowi **${user}**! \n\nObecny stan konta **${user}**: ${bal}`);
        msg.channel.send(moneyEmbed)
    } 
}
