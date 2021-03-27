const { Permissions: { FLAGS }, MessageEmbed } = require("discord.js");
const f = require(__dirname + "/../functions.js") 

module.exports = {
    name: "ankieta",
    description: "Tworzy ankietę",
    category: "admin",
    guildOnly: true,
    args: 1,
    ussage: ["<nazwa ankiety>", "<nazwa ankiety> <opcje ankiety (aby odzielić opcję od pytania użyj '&&')"],
    userPermissions: [FLAGS.ADMINISTRATOR],
    userTextPermission: "administartor",

    run(msg, args) {
        msg.delete()
        const reason = args.join(" ").replace(" && ", "&&").split("&&")
        const anserws = [...reason].slice(1)
        if(anserws.length) {
            let MultiReasonText = ""
 

            if (anserws.length > 9) return msg.channel.send(f.customEmoji("bad") + " Liczba opcji nie może przekraczać `9`.")

            anserws.forEach((r, i) => {
                const emoji = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]
                if (i === 0) MultiReasonText += `${emoji[i]} - ${r}`
                if (i > 0) MultiReasonText += `\n${emoji[i]} - ${r}`
            })
            const embed = new MessageEmbed()
            .setTitle(reason[0])
            .setDescription(MultiReasonText)
            .setColor(f.colorToHex("lightgreen"))
            msg.channel.send(embed).then((message) => {
                anserws.forEach(async (r, i) => {
                    const emoji = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]
                    
                    await message.react(emoji[i])
                    
                    
                    
                })
           

            })
      
        } else {
            const embed = new MessageEmbed()
            .setTitle(reason)
            .setColor(f.colorToHex("lightgreen"))
            
            
            msg.channel.send(embed).then(async (message) => {
                await message.react(f.customEmoji("tak"))
                await message.react(f.customEmoji("help"))
                await message.react(f.customEmoji("bad"))
            })
        }
    }
}