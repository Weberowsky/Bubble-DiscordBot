const { MessageEmbed } = require("discord.js")
module.exports = {
    name:"info",
    aliases: ["botinfo"],
    description:"WyΕwietla informacje o bocie.",
    category: "bot",

    run(msg) {
        const { Botauthor, Botversion, Botname, Botdescription, Botlastupdate } = require(__dirname + "/../config/informations.js")
        const { channel } = msg
        const InfoEmbed = new MessageEmbed()
                .setTitle('Informacje o bocie')
                .setColor("#00ff59")
                
                .addField("π» Nazwa:", "`Bubble`")
                .addField("π₯ Autor:", "`Titon#2118`")
                .addField("π Biblioteka:", "`Discord.js`")
            
                .addField("π Opis:", "`Wielofunkcyjny, polski bot discord.`")  
                .addField("π  Wersja:", `\`${Botversion}\``)
                .addField("π Ostatnia aktualizacja: ", `\`${Botlastupdate}\``)
                .setTimestamp()
              channel.send(InfoEmbed);
    

    }
}
