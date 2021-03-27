const { MessageEmbed } = require("discord.js");
const { toUpperCase } = require("ffmpeg-static");
const f = require(__dirname + "/../functions.js")
const db = client.db

module.exports = {
    name:"ustawienia",
    description:"Wyświetla listę ustawień serwera.",
    category: "conf",
    aliases: ["config", "conf", "settings"],
    async run(msg, args) {
      
      const prefix = await db.get(msg.guild.id + ".prefix")
      const embed = new MessageEmbed()
      .setTitle(f.customEmoji('settings') + " Ustawienia")
      .setColor(f.colorToHex("lightgreen"))
      .setDescription(`Ustawienia pozwalają na dostosowanie bota. Aby wyświetlić wybraną kategorię, wpisz \`${prefix}ustawienia <nr / nazwa kategorii>\`. Oto lista kategorii: \n`)
      .addField(`🤖 1. Bot`, `Ustawienia bota (prefix, powiadomienia o zdobyciu poziomu)`)
      .addField(`👋 2. Powitania`, `Dostosuj treść, kanał i inne opcje powitań oraz pożegnań.`)
      .addField(`💰 3. Ekonomia`, `Ustawienia dotyczące ekonomii (np. waluta serwera)`)
      .addField(`🛠 4. Automod`, `Automatycznie moderuje serwer (np. anty-invite)`)
      .addField(`🌐 5. Customlink`, `Ustawienia skróconego linku do serwera.`)
      
    
      if (args[0] == '1' || args[0] == 'bot' || args[0] == 'Bot') {
        let ggh = await db.get(msg.guild.id + ".levelmsg")
        if (!ggh) {
          ggh = "Brak"
        }
        const bot = new MessageEmbed()
        .setTitle(f.customEmoji('settings') + " Ustawienia bota")
        .setColor(f.colorToHex("lightgreen"))
        .setDescription(`Ustawienia pozwalają na dostosowanie bota. Aby ustawić wybraną wartość, wpisz \`${prefix}ustaw <numer ustawienia> <wartość>\`. Oto lista ustawień z kategorii \`Bot\`: \n`)
        .addField(`1. Prefix`, `Prefix bota na serwerze, który musi być wpisany przed każdą komendą.\n**Obecny prefix: ** ${await db.get(msg.guild.id + ".prefix")}`)
        .addField(`2. Powiadomienia o zdobyciu poziomu`, `Ustala, czy bot ma informować użytkownika o zdobyciu kolejnego poziomu.\n**Obecne ustawienie: ** ${ggh}`)
        return msg.channel.send(bot)
      }

      if (args[0] == '2' || args[0] == 'powitania' || args[0] == 'Powitania') {
        let ghh = await db.get(msg.guild.id + ".welcomechannel")
        if (!ghh) {
          ghh = "Brak"
        }
        let ghh1 = await db.get(msg.guild.id + ".welcometext")
        if (!ghh1) {
          ghh1 = "Brak"
        }
        let ghh2 = await db.get(msg.guild.id + ".goodbyechannel")
        if (!ghh2) {
          ghh2 = "Brak"
        }
        let ghh3 = await db.get(msg.guild.id + ".goodbyetext")
        if (!ghh3) {
          ghh3 = "Brak"
        }
        let ghh4 = await db.get(msg.guild.id + ".invitecard")
        if (!ghh4) {
          ghh4 = "Brak"
        }
        const bot2 = new MessageEmbed()
        .setTitle(f.customEmoji('settings') + " Ustawienia powitań")
        .setColor(f.colorToHex("lightgreen"))
        .setDescription(`Ustawienia pozwalają na dostosowanie bota. Aby ustawić wybraną wartość, wpisz \`${prefix}ustaw <numer ustawienia> <wartość>\`. Oto lista ustawień z kategorii \`Powitania\`: \n`)
        .addField(`3. Kanał powitań`, `Kanał, na który będą wysyłane powitania nowych członków serwera.\n**Obecne ustawienie: ** <#${ghh}>`)
        .addField(`4. Tekst powitań`, `Tekst wysyłany po dołączeniu nowego użytkownika. Pamiętaj, że nazwę użytkownika możesz uzyskać polem \`{user}\`.\n**Obecne ustawienie: ** ${ghh1}`)
        .addField(`5. Kanał pożegnań`, `Kanał, na który będą wysyłane pożegnania użytkowników opuszczających serwer.\n**Obecne ustawienie: ** <#${ghh2}>`)
        .addField(`6. Tekst pożegnań`, `Tekst wysyłany po wyjściu użytkownika z serwera. Pamiętaj, że nazwę użytkownika możesz uzyskać polem \`{user}\`.\n**Obecne ustawienie: ** ${ghh3}`)
        .addField(`9. Karta powitalna`, `Wysyła kartę powitalną pod tekstem powitania.\n**Obecne ustawienie: ** ${ghh4}`)
        return msg.channel.send(bot2)
      }
        
      if (args[0] == '3' || args[0] == 'ekonomia' || args[0] == 'Ekonomia') {
        let ghh3 = await db.get(msg.guild.id + ".currency")
        if (!ghh3) {
          ghh3 = "Brak"
        }
        const bot3 = new MessageEmbed()
        .setTitle(f.customEmoji('settings') + " Ustawienia ekonomii")
        .setColor(f.colorToHex("lightgreen"))
        .setDescription(`Ustawienia pozwalają na dostosowanie bota. Aby ustawić wybraną wartość, wpisz \`${prefix}ustaw <numer ustawienia> <wartość>\`. Oto lista ustawień z kategorii \`Ekonomia\`: \n`)
        .addField(`7. Waluta serwera`, `Nazwa lub emoji, która będzie przedstawiana jako waluta serwera.\n**Obecne ustawienie: ** ${ghh3}`)
  
        return msg.channel.send(bot3)
      }

      if (args[0] == '4' || args[0] == 'automod' || args[0] == 'Automod') {
        let ghh3 = await db.get(msg.guild.id + ".antyinvite")
        let ghh4 = await db.get(msg.guild.id + ".autorole")
         let ghh5 = await db.get(msg.guild.id + ".invitewarntext")
        if (!ghh3) {
          ghh3 = "Brak"
        }
        if (!ghh4) {
          ghh4 = "Brak"
        }
          if (!ghh5) {
          ghh5 = "Brak"
        }
        const bot3 = new MessageEmbed()
        .setTitle(f.customEmoji('settings') + " Ustawienia Automod")
        .setColor(f.colorToHex("lightgreen"))
        .setDescription(`Ustawienia pozwalają na dostosowanie bota. Aby ustawić wybraną wartość, wpisz \`${prefix}ustaw <numer ustawienia> <wartość>\`. Oto lista ustawień z kategorii \`Automod\`: \n`)
        .addField(`8. Anty-invite`, `Zabrania użytkownikom wysyłania zaproszeń na tym serwerze (nie dotyczy administracji)\n**Obecne ustawienie: ** ${ghh3}`)
        .addField(`10. Auto-role`, `Automatycznie nadaje role nowym członkom serwera: ** ${ghh4}`)
        .addField(`11. Anty-invite text`, `Ustawia treść ostrzeżenia wysyłanego przez moduł anty-invite: ** ${ghh5}`)
  
  
        return msg.channel.send(bot3)
      }

      if (args[0] == '5' || args[0] == 'customlink' || args[0] == 'Customlink') {
        const premium = await db.get(msg.guild.id + ".premium")
        const bot4 = new MessageEmbed()
        .setTitle(f.customEmoji('settings') + " Ustawienia customlinku")
        .setColor(f.colorToHex("lightgreen"))
        .setDescription(`Ustawienia pozwalają na dostosowanie bota. Aby ustawić wybraną wartość, wpisz \`${prefix}ustaw <numer ustawienia> <wartość>\`. Oto lista ustawień z kategorii \`Customlink\`: \n`)
        
        if (premium == 'tak') {
          let gyg = msg.guild.name.replace(" ", "")
          bot4.addField(`Customlink`, `Customlink jest włączony!\nhttps://bubble.tk/${gyg}`)
        } else {
          bot4.addField(`Customlink`, `Customlink jest wyłączony. Włączyć go mogą tylko serwery premium!`)
        }
        return msg.channel.send(bot4)
      }

      msg.channel.send(embed)
    }
    

    
}
