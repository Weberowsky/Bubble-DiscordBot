const { MessageEmbed, Permissions: {FLAGS} } = require("discord.js")
const db = client.db
module.exports = {
    name: "add-money",
    description: "Dodaje monety uzytkownikowi.",
    category: "economy",
    guildOnly: true,
    args: 2,
    aliasy: ["dodaj-monety", "add-cash"],
    ussage: "@użytkownik <liczba moent>",
    userPermissions: [FLAGS.ADMINISTRATOR],
    userTextPermission: "administartor",

    async run(msg, args) {

        let user = msg.mentions.members.first() || msg.author;

        if (isNaN(args[1])) return;
        db.add(`money_${msg.guild.id}_${user.id}`, args[1])
        let bal = await db.fetch(`money_${msg.guild.id}_${user.id}`)
    
        const moneyEmbed = new MessageEmbed()
        .setTitle("Dodawanie monet")
        .setColor("#14f52b")
        .setDescription(f.customEmoji('love') + ` Pomyślnie dodano ** ${args[1]} ** monet uzytkownikowi **${user}**! \n\nObecny stan konta **${user}**: **${bal}**`);
        msg.channel.send(moneyEmbed)
    } 
}
