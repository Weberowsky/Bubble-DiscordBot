const { MessageEmbed } = require("discord.js")
const { readdirSync } = require("fs")
const chalk = require("chalk")
const {programers, supporters, testers } = require("../config/config.js")
const { time } = require("console")
const db = client.db
const f = require(__dirname + "/../functions.js")

module.exports = {
    name:"help",
    description:"Wyświetla listę komend.",
    category: "bot",
    ussage: "[nazwa komendy]",
    aliases: ["pomoc", "h"], 

    async run(msg, args) {
     
   
       let prefix = await db.get(msg.guild.id + ".prefix")
   
        const { commands } = msg.client
        const { userprogramperms } = f.userProgramPerms(1, msg.author.id)
        const categories = ["Administracyjne :lock:", "Narzędzia :tools:", "4Fun :tada:",  "Ekonomia :moneybag:", "Konfiguracja :gear:"]
       categories.push(`Muzyczne 🎶`)        
      if (!args.length) {
            //`Oto lista kategori. Wpisz \`/${cmdname} <nr kategori>\`, aby wyświetlić komendy z wybranej kategori.`
            categoriesDescription = [`\`\`\`${prefix}help 1\`\`\``, `\`\`\`${prefix}help 2\`\`\``, `\`\`\`${prefix}help 3\`\`\``, `\`\`\`${prefix}help 4\`\`\``, `\`\`\`${prefix}help 5\`\`\``, `\`\`\`${prefix}help 6\`\`\``]
            const embed = new MessageEmbed()
            .setColor('#00ff59')
            .setTitle("Lista kategorii")
            .setFooter(`Wywołano przez: ${msg.author.tag}`, msg.author.displayAvatarURL())
        
            .setDescription(`Hej, **${msg.author.username}**! Oto lista kategorii komend, które posiada Bubble.\n Wpisz \`${prefix}help <nr lub nazwa kategorii>\`,  aby wyświetlić komendy z wybranej kategorii.`)
            categories.forEach((c, i) => {2
                embed.addField(`${c}`, categoriesDescription[i], true)
            })
            msg.channel.send(embed)
        } else {
            let name = args[0].toLowerCase()
            name = name.replace("administracyjne", "1")
            name = name.replace("narzedzia", "2")
            name = name.replace("narzędzia", "2")
            name = name.replace("4fun", "3")
            name = name.replace("fun", "3")
            name = name.replace("ekonomia", "4")
            name = name.replace("config", "5")
            name = name.replace("konfiguracja", "5")
            name = name.replace("music", "6")
            name = name.replace("muzyczne", "6")

            const commandName = 
            commands.get(name) ||
            commands.find((c) =>  c.aliases && c.aliases.includes(name))
            
            const categorynumber = parseFloat(name, 10)
            if(!commandName && Number.isNaN(categorynumber)) {
            return msg.channel.send(`${f.customEmoji("no")} \`${prefix}${name}\` nie jest komendą. Wpisz \`${prefix}help <nr kategorii>\`, aby wyświetlić komendy z wybranej kategori.`)
            }
            if (!Number.isNaN(categorynumber)) {
                if(!Number.isInteger(categorynumber) || categorynumber < 1 || categorynumber > categories.length) return msg.channel.send(`${f.customEmoji("no")} Wprowadź prawidłowy numer kategori. Wpisz \`${prefix}${cmdname}\`, aby wyświetlić listę kategori.`)
                const cmdCategories = ["admin", "tools", "fun", "economy", "conf", "music",]
                let cmds = commands.filter(c => c.category === cmdCategories[categorynumber - 1]).map(c => `\`${prefix}${c.name}\` - ${c.description}`).join("\n")
              
             
             
             
                const embed = new MessageEmbed()
                .setTitle("Lista komend")
                .setDescription(`Wyświetlam listę komend z kategori **${categories[categorynumber - 1]}**. Wpisz \`${prefix}help <komenda>\`, aby wyświetlić informacje o wybranej komendzie. \n\n` + cmds)
                .setColor(`#00ff59`)
                msg.channel.send(embed)
              

               
            } else {
    
            if ((commandName.devlvl && userprogramperms < commandName.devlvl) || (commandName.dissable && userprogramperms < 2)) {
            return msg.channel.send(`${f.customEmoji("no")} Nie masz wystarczającego poziomu uprawnień develpoerów bota, aby wyświetlić szczegóły tej komendy.\nWymagany poziom uprawnień: \`${commandName.devlvl} (${mintext})\`\nTwój poziom uprawnień: \`${userprogramperms} (${userprogrampermstext})\``)
            }
            
            const commandInfoName = commandName.name
            
            
            
        
            const infoEmbed = new MessageEmbed()
            .setTitle("Informacje o komendzie")
            .setColor("#00FF59")
            .addField("🏷 Nazwa:", commandInfoName)
            if (commandName.description){ 
            const commandInfoDescription = commandName.description
            infoEmbed.addField("📃 Opis:", "`" + commandInfoDescription + "`") }
                if (commandName.ussage) {
                    let reply = "" 
                    if (typeof(commandName.ussage) === "string") {
                        reply +=`\`${prefix}${commandInfoName} ${commandName.ussage}\``
                    } else {
                        reply += commandName.ussage.map(u => `\`${prefix}${commandInfoName} ${u}\``).join(" lub ")
                    }
                    if (commandName.example) {
                        if (typeof(commandName.example) === "string") {
                        reply += `\nPrzykładowe użycie: ${prefix}${commandInfoName} ${commandName.example}`
                        } else {
                            reply += "\nPrzykładowe użycie: " + commandName.example.map(e => `${prefix}${commandInfoName} ${e}`).join(" lub ")
                        }
                    }
                    infoEmbed.addField("🛠 Użycie:", reply) 
        }
            if (commandName.aliases) { 
            const commandInfoAliases = f.betterjoin(commandName.aliases.map(a => "`" + a + "`"))
            infoEmbed.addField("📚 Aliasy:", commandInfoAliases) }
        
            msg.channel.send(infoEmbed)
        }
    }
        
}
    

    }

    

