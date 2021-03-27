

const f = require(__dirname + "/../functions.js")
const { MessageEmbed } = require("discord.js");
const ms = require("parse-ms");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Bubble:babeltrabel52@cluster0.slsu3.mongodb.net/Bubble?retryWrites=true&w=majority");

module.exports = {
    name: "work",
    aliases: ["pracuj"],
    guildOnly: true,
    description: "Pracuj i zbierz monety",
    category: "economy",

    async run(msg, args) {

    
        let user = msg.author;
        let author = await db.fetch(`work_${msg.guild.id}_${user.id}`)
    
        let timeout = 3600000;
    
        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));
        
            let timeEmbed = new MessageEmbed()
            .setTitle("Poczekaj!")
            .setColor("#f00a0a")
            .setDescription(f.customEmoji("no") + ` Pracowałeś już w ciągu ostatniej godziny!\nPoczekaj chwilę i spróbuj ponownie za **${time.minutes} minut i ${time.seconds} sekund** `);
            msg.channel.send(timeEmbed)
          } else {
    
            let replies = ['Programista','Budowlaniec','Kelner','Nauczyciel','Szef kuchni','Mechanik', 'Listonosz', 'Kasjer']
    
            let result = Math.floor((Math.random() * replies.length));
            let amount = Math.floor(Math.random() * 80) + 1;
            const embed1 = new MessageEmbed()
            .setTitle(`Zarobiłeś ${amount} monet!`)
            .setColor("#00fa2e")
            .setFooter(`Wywołano przez: ${msg.author.username}`,  msg.author.displayAvatarURL())
            .setDescription(f.customEmoji("love") + ` Pracowałeś jako **${replies[result]}** i zarobiłeś(-aś) ${amount} monet!`);
            msg.channel.send(embed1)
            
            await db.add(`money_${msg.guild.id}_${user.id}`, amount)
            await db.add(`money_${msg.guild.id}`, amount)
            await db.set(`work_${msg.guild.id}_${user.id}`, Date.now())
        };
    }

}
