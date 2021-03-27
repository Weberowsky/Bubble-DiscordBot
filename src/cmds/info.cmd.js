const { MessageEmbed } = require("discord.js")
module.exports = {
    name:"info",
    aliases: ["botinfo"],
    description:"Wyświetla informacje o bocie.",
    category: "bot",

    run(msg) {
        const { Botauthor, Botversion, Botname, Botdescription, Botlastupdate } = require(__dirname + "/../config/informations.js")
        const { channel } = msg
        const InfoEmbed = new MessageEmbed()
                .setTitle('Informacje o bocie')
                .setColor("#00ff59")
                
                .addField("👻 Nazwa:", "`Bubble`")
                .addField("👥 Autor:", "`Titon#2118`")
                .addField("📚 Biblioteka:", "`Discord.js`")
            
                .addField("📃 Opis:", "`Wielofunkcyjny, polski bot discord.`")  
                .addField("💠 Wersja:", `\`${Botversion}\``)
                .addField("📆 Ostatnia aktualizacja: ", `\`${Botlastupdate}\``)
                .setTimestamp()
              channel.send(InfoEmbed);
    

    }
}
