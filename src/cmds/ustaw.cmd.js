const { MessageEmbed, Permissions: {FLAGS} } = require("discord.js")
const f = require(__dirname + "/../functions.js")
const db = client.db


module.exports = {
    name:"ustaw",
    description:"Ustawia konfiguracje serwera.",
    userPermissions: [FLAGS.ADMINISTRATOR],
    userTextPermissions: "administrator",
    category: "conf",
    guildOnly: true,
    args: 2,
    ussage: "<numer ustawienia> <wartość>",
    aliases: ["set"],
    async run(msg, args) {
        let settingNumber = Number(args[0])
        let settingsVar = args.slice(1).join(" ")
        const { guild, channel, client, author } = msg

        if(!Number.isInteger(settingNumber) || settingNumber > client.settings.size  || settingNumber < 1) return channel.send(f.customEmoji("bad") + " Podaj prawidłowy numer ustawienia.")
        settingNumber --
        const setting = client.settings.array()[settingNumber]
        let text = ""


      


        if (setting.type === "text") {
           theargs = args.join(" ")
           value = theargs.toString().slice(1)
           console.log(settingNumber)
           if (settingNumber == 10) {
             value = value.replace(`1`, " ")
           }
          text = setting.text ? setting.text.replace("$var", text) : `ustawiono **${setting.viewName}** na **${value}**.`
          db.set(msg.guild.id + "." + setting.name, value)
       
          }

       

          if (setting.type === "role") {
            
            theargs = args.join(" ")
            
            value = theargs.toString().slice(2)
            if (!value.startsWith("<@&") & !value.endsWith(">")) {
              return channel.send(f.customEmoji('bad') + " Nie oznaczono prawidłowej `@Roli`")
            }
         
           text = setting.text ? setting.text.replace("$var", text) : `ustawiono **${setting.viewName}** na **${theargs.toString().slice(2)}**.`
           db.set(msg.guild.id + "." + setting.name, theargs.toString().slice(2))
        
           }

          if (setting.type === "prefix") {
            let prefix = args[1]
            if (prefix.length > 5) return msg.channel.send(f.customEmoji("bad") + " Prefix nie może mieć więcej niż 5 znaków.")
            if (["reset", "r"].includes(prefix)) prefix = client.prefix
            const currentprefix = await db.get(msg.guild.id + '.prefix')
            const embed = new MessageEmbed()
            .setTitle("Zmieniono prefix")
            .setColor(f.colorToHex("lightblue"))
            .addField("Stary prefix:", "`" + currentprefix + "`")
            .addField("Nowy prefix:", "`" + prefix + "`")
          await db.set(msg.guild.id + ".prefix", prefix)
            msg.guild.prefix = prefix
            msg.channel.send(embed)
        return;
           }

        if (setting.type === "bool") {
           
            text = setting.text ? setting.text.replace("$var", text) : `ustawiono **${setting.viewName}** na **${args[1]}**.`
            if (args[1] == "tak") {
              db.set(msg.guild.id + "." + setting.name, "tak")
            } else if (args[1] == "nie") {
              db.set(msg.guild.id + "." + setting.name, "nie")
            } else {
              msg.channel.send("Podaj prawidłową wartość (tak / nie)")
              return;
            }

     
            
        } else if (setting.type === "channel") {
          settingsVar = settingsVar.split(" ")[0]
          if (!settingsVar.startsWith("<#") || !settingsVar.endsWith(">")) return msg.channel.send(f.customEmoji("bad") + " Podaj prawidłowy kanał.")
          const channel = msg.guild.channels.cache.get(settingsVar.slice(2, -1))
          if (!msg.guild.me.permissionsIn(channel).has([FLAGS.VIEW_CHANNEL, FLAGS.SEND_MESSAGES])) return msg.channel.send(f.customEmoji("bad") + " Na kanale <#" + channel + "> bot nie ma uprawnień do wyświetlania kanału lub wysyłania wiadomości.")
          db.set(msg.guild.id + "." + setting.name, channel.id)
          text = setting.text ? setting.text.replace("$var", channel) : `ustawiono **${setting.viewName}** na **${channel}**.`

        }
        const embed = new MessageEmbed()
        .setTitle("Ustawiono")
        .setColor(f.colorToHex("red"))
        .setDescription(`Pomyślnie ${text}`)

        msg.channel.send(embed)

      

        
    
    
}
}
