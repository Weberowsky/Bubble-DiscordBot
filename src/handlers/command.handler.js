const { MessageEmbed, MessageAttachment } = require('discord.js');
const { Collection } = require("discord.js")
const { readdirSync } = require("fs")
const ascii = require("ascii-table")
const { programers } = client.config
const table = new ascii().setHeading("Komenda","Status", "Uwagi")
const f = require(__dirname + "/../functions.js")
const { textPermissions } = f
const Canvas = require('canvas')
const hastebin = require("hastebin.js");
const { type } = require('os');
const haste = new hastebin()
const parse = require("parse-ms")
const { Database } = require("quickmongo");
const { Player } = require("discord-music-player");

// ============================== //
//         Moduły bota            //
// ============================== //


  // Baza danych - przechowuje dane
client.db = new Database(process.env.mongoUrl)

  // Komendy - odpowiada za wykonywanie komend
client.commands = new Collection()

  // musicPlayer - Odtwarza muzykę
client.musicPlayer = new Player(client, {
  leaveOnEmpty: false, 
})

module.exports = (client) => {


    // skraca client.db na db
  let db = client.db

    const commandFiles = readdirSync(__dirname + "/../cmds").filter(file => file.endsWith(".cmd.js"))

    for (const file of commandFiles) {
        const command = require(__dirname + `/../cmds/${file}`)
        const errors = []
        if (command.name) {
            client.commands.set(command.name, command)
            if (!command.description) errors.push("Komenda nie posiada opisu.")
            if (!command.category && !command.devlvl) errors.push("Komenda nie posiada kategori.")
            if (command.onlyGuild) {
                errors.push("Komenda zawiera 'onlyGuild', a powinna zawierać 'guildOnly'.")
            } else if((command.userPermissions || command.botPermissions) && !command.guildOnly) {
                errors.push("Komenda zawiera element `uprawnienia`, a nie zawiera 'guildOnly'")
            }
            if (command.args && command.args > 0 && !command.ussage) errors.push("Komenda wymaga argumentów, a nie zawiera 'ussage'.")
            if(!errors.length) errors.push("Brak")
            table.addRow(file,"✅", errors.join(", "))
        } else {
            table.addRow(file,"❌ - brakuje 'name'", "<---")
            continue
        }
    }
    // Wyświetla tablice komend.
    console.log(table.toString())



// Powitania i autorole
    client.on('guildMemberAdd', async member => {
     
      let gop = await db.get(member.guild.id + ".autorole")
      if (gop) {
      gop = gop.replace("<@&", "")
      gop = gop.replace(">", "")
      gop = gop.replace("10 ", "")
      }
      const welchannel = member.guild.channels.cache.get(await db.get(`${member.guild.id}.welcomechannel`))
      const welcontent = await db.get(`${member.guild.id}.welcometext`)
      
      if (gop) {
        console.log(gop)
        let role = member.guild.roles.cache.find(role => role.id === gop);
        member.roles.add(role);
      }

      if (welchannel == null || welcontent == null){
        return;
      }
  
      

        if (welcontent.includes("{user}")) {  
          var maincontent = welcontent.replace("{user}", `<@${member.id}>`)
        }
      
        if (await db.get(`${member.guild.id}.invitecard`) == 'tak') {
          const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
          
            // Declare a base size of the font
            let fontSize = 70;
          
            do {
              // Assign the font to the context and decrement it so it can be measured again
              ctx.font = `${fontSize -= 10}px sans-serif`;
              // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (ctx.measureText(text).width > canvas.width - 300);
          
            // Return the result to use in the actual canvas
            return ctx.font;
          };
           
          const canvas = Canvas.createCanvas(700, 250);
          const ctx = canvas.getContext('2d');
        
          const background = await Canvas.loadImage('https://i.imgur.com/GoHLmY8.jpg');
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
       
        
          // Slightly smaller text placed above the member's display name
          ctx.font = '28px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText('Witamy na serwerze,', canvas.width / 2.5, canvas.height / 3.5);
        
          // Add an exclamation point here and below
          ctx.font = applyText(canvas, `${member.displayName}!`);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
        
          ctx.beginPath();
          ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();
        
          const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
          ctx.drawImage(avatar, 25, 25, 200, 200);
        
          const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome.png');
        
          welchannel.send(attachment);
        
        welchannel.send(`${maincontent}`)
        }
      

      
       
      }
    
     
  );

  // Pożegnania
  client.on('guildMemberRemove', async member => {
     const chp = await db.get(`${member.guild.id}.goodbyechannel`)
    const welchannel = member.guild.channels.cache.get(chp)
    const welcontent = await db.get(`${member.guild.id}.goodbyetext`)
    
    if (!welchannel || !welcontent){
      return;
    }

      if (welcontent.includes("{user}")) {  
        var maincontent = welcontent.replace("{user}", `${member.user.username}`)
      }
    
      if (welcontent.includes("{members}")) {
        var maincontent = welcontent.replace("{members}", memberCount)
      }
    
    welchannel.send(`${maincontent}`)
     
    }
  
   
);



    client.on("message", async (msg) => {
      
        const { author, guild, channel } = msg
        
          let prefix = await db.get(msg.guild.id + ".prefix")
          if (!prefix || prefix == 'brak') {
            prefix = "?"
            db.set(msg.guild.id + ".prefix", "?")
          }
     
        const cooldowns = await db.get(msg.guild.id + ".cooldowns") ? await db.get(msg.guild.id + ".cooldowns") : db.set(msg.guild.id + ".cooldowns", {})
        // Sprawdza, czy użytkownik jest botem.
        if (author.bot) {
          return
        }
        

        // Anty-invite
        if (!msg.member.hasPermission('ADMINISTRATOR')) {

       
          if (await db.get(msg.guild.id + ".antyinvite") == 'tak') {
           
            let warntext = await db.fetch(`${msg.guild.id}.invitewarntext`)
            if (!warntext) {
              warntext = `Ten serwer jest chroniony modułem **anty-invite** - wszystkie zaproszenie do serwerów discord (oprócz tych wysłanych przez administratorów) są usuwane.`
            }

            if (msg.content.includes("discord.gg/")) {
            
              msg.delete()
              const emb = new MessageEmbed()
              .setTitle('⛔ Anty-invite')
              .setColor('RED')
              .setFooter(msg.author.tag, msg.author.displayAvatarURL())
              .setDescription(warntext)
              return msg.channel.send(emb);
  
            } 
          }
  
        }
       
        // Ignoruje wiadomości bez prefixu.
        if (!msg.content.startsWith(prefix)) {
          const currentExp = [null, undefined].includes(await db.get(`${msg.guild.id}.exp.${msg.author.id}`)) ? 0 : await db.get(`${msg.guild.id}.exp.${msg.author.id}`)
          db.add(`${msg.guild.id}.exp.${msg.author.id}`, f.randomNumber(3, 10))
          const newExp = [null, undefined].includes(await db.get(`${msg.guild.id}.exp.${msg.author.id}`)) ? 0 : await db.get(`${msg.guild.id}.exp.${msg.author.id}`)
          const lvls = [100]
          while (lvls[lvls.length - 1] <= newExp) {
            lvls.push(lvls[lvls.length - 1] + 150 + lvls.length * 5)
          }
          const currentLvl = lvls.indexOf(lvls.filter(e => e <= currentExp).slice(-1)[0]) + 1 < 1 ? 0 : lvls.indexOf(lvls.filter(e => e <= currentExp).slice(-1)[0]) + 1
          const newLvl = lvls.indexOf(lvls.filter(e => e <= newExp).slice(-1)[0]) + 1 < 1 ? 0 : lvls.indexOf(lvls.filter(e => e <= newExp).slice(-1)[0]) + 1
        if (!await db.get(msg.guild.id + ".levelmsg") == 'nie') {
          if (newLvl > currentLvl) {
          
            msg.channel.send(`Brawo, <@${msg.author.id}> właśnie wbiłeś **` + newLvl + "** poziom. Gratulacje!")
            
          } else {
            return;
          }
        }
         
          return
        }
        
      
        // Zmienna z argumentami.
       const args = msg.content.slice(prefix.length).trim().split(/ +/g)
  

        // Zmienna z komendą.
        const cmdName = args.shift().toLowerCase()
        const cmd =
        client.commands.get(cmdName) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(cmdName),
        )
  
        
      // Sprawdza czy komenda istnieje
      if (!cmd) return
     
// Sprawdza czy użytkownik ma gbana
      const gb = await db.get("blacklist")
      if (gb) {
        if (gb.includes(msg.author.id)) {
          const emb = new MessageEmbed()
          .setTitle('Nie możesz użyć tej komendy')
          .setColor('RED')
          .setDescription(`Nie możesz używać komend bota Bubble, ponieważ zostałeś globalnie zbanowany przez jego developerów. Twierdzisz, że gban został nadany bezpodstawnie? Skontaktuj się z nami klikając[tutaj](titondesign.konatkt@gmail.com)`)
          return msg.channel.send(emb);
        }
      }
     

       if(cmd.devlvl) {
        const { text, userprogramperms } = f.userProgramPerms(3, msg.author.id)
      
      if(userprogramperms < cmd.devlvl) {
        emb2 = new MessageEmbed()
        .setTitle(`Nie posiadasz uprawnień`)
        .setDescription(text)
        .setColor(f.colorToHex('lightblue'))
        .setFooter(msg.author.tag, msg.author.displayAvatarURL())
         return msg.channel.send(emb2)
       }
       
  
      }
      const { text, userprogramperms } = f.userProgramPerms(2, msg.author.id)
      if(cmd.disabled && userprogramperms < 2) {
        const emb = new MessageEmbed()
        .setTitle("Nie posiadasz uprawnień")
        .setColor(f.colorToHex('lightblue'))
        .setDescription(`${f.customEmoji("bad")}Ta komenda jest wyłączona. Nie masz wystarczającego poziomu uprawnień develpoerów bota aby ją uruchomić.\nWymagany: \`${cmd.devlvl} (${mintext})\`\nTwój: \`${userprogramperms} (${userprogrampermstext})\``)
        return msg.channel.send(emb)
      }
        
        if (cmd.guildOnly && !guild) {
            return msg.channel.send(f.customEmoji("bad") + " Ta komenda nie jest możliwa do użycia na DM.")
        }

        //===================================================
        //
        //              Sprawdza uprawnienia
        //
        //===================================================

        // Sprawdza uprawnienia bota
        if (cmd.botPermissions && cmd.botPermissions.length) {
          if (!guild.me.permissionsIn(channel).has(cmd.botPermissions)) {
            const noperm = new MessageEmbed()
            .setTitle('Bot nie ma uprawnień')
            .setColor(f.colorToHex('lightblue'))
            .setDescription(`${f.customEmoji("bad")} Bot nie posiada uprawnień do wykonania tej komendy\nWymagane uprawnienia: **${f.textPermissions(cmd.userPermissions).toUpperCase()}**`)
            .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL())
            return channel.send(noperm)
          }
        }
        
        // Sprawdza uprawnienia użytkownika
        if (cmd.userPermissions && cmd.userPermissions.length) {
          if(!msg.member.permissionsIn(channel).has(cmd.userPermissions) && !programers.includes(msg.author.id)) {
            const noperm = new MessageEmbed()
            .setTitle('Nie posiadasz uprawnień')
            .setColor(f.colorToHex('lightblue'))
            .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL())
            .setDescription(`${f.customEmoji("bad")} Nie posiadasz wystarczających uprawnień do wykonania tej komendy\nWymagane uprawnienia: **${f.textPermissions(cmd.userPermissions).toUpperCase()}**`)
            return channel.send(noperm)
          }
        }


        // Sprawdza, czy argumenty są wymagane i czy zostały podane
        if (cmd.args && args.length < cmd.args ) {
            let reply =  f.customEmoji("bad") + " Podaj argumenty."

            if (cmd.ussage) {
               if (typeof(cmd.ussage) === "string") {
                reply = reply + `\nPoprawne użycie: \`${msg.prefix}${cmdName} ${cmd.ussage}\``
               } else {
                reply += "\nPoprawne użycie: " + cmd.ussage.map(u => `\`${msg.prefix}${cmdName} ${u}\``).join(" lub ")
               }
               if (cmd.example) {
                   if (typeof(cmd.example) === "string") {
                   reply += `\nNa przykład: \`${msg.prefix}${cmdName} ${cmd.example}`
                   } else {
                       reply += "\nNa przykład: " + cmd.example.map(e => `\`${msg.prefix}${cmdName} ${e}\``).join(" lub ")
                   }
               }
            }
            const replyemb = new MessageEmbed()
            .setTitle("Wystąpił błąd")
            .setDescription(reply)
            .setColor('#00ff77')
            return msg.channel.send(replyemb)
            
        }
        // Obsłguje cooldowny
       if (cmd.cooldown) {
         const config = {
           message: {
             content: f.customEmoji("bad") + " Poczekaj jeszcze **$amount** przed ponownym użyciem komendy `$cmd`."
           }
         }
         if (typeof(cmd.cooldown) === "object") {
          if (typeof(cmd.cooldown.amount) === "number") {
            config.amount = cmd.cooldown.amount * 1000
           } else if (typeof(cmd.cooldown.amount) === "boolean") {
            config.amount = client.config.defaultCooldown * 1000
           } else if (typeof(cmd.cooldown.amount) === "string") {
             const amount = f.timeToMs(cmd.cooldown.amount)
             if (amount.status === "success") config.amount = amount.amount
             if (amount.status === "error") config.amount = client.config.defaultCooldown * 1000
            }
            if (cmd.cooldown.message) {
            if (!cmd.cooldown.message.content && cmd.cooldown.message.embed) delete config.message.content
            if (cmd.cooldown.message.embed) {
              config.message.embed = {}
              config.message.embed.title = cmd.cooldown.message.embed.title ? cmd.cooldown.message.embed.title : "Poczekaj"
              config.message.embed.color = cmd.cooldown.message.embed.color ? cmd.cooldown.message.embed.color : f.colorToHex("red")
              config.message.embed.description = cmd.cooldown.message.embed.description ? cmd.cooldown.message.embed.description : "Zaczekaj jeszcze **$amount** przed ponownym użyciem komendy `$cmd`."
              if (cmd.cooldown.message.embed.footer) config.message.embed.footer = cmd.cooldown.message.embed.footer
            }
            }
         } else if (typeof(cmd.cooldown) === "number") {
          config.amount = cmd.cooldown * 1000
         } else if (typeof(cmd.cooldown) === "boolean") {
          config.amount = client.config.defaultCooldown * 1000
         } else if (typeof(cmd.cooldown) === "string") {
           const amount = f.timeToMs(cmd.cooldown)
           if (amount.status === "success") config.amount = amount.amount
           if (amount.status === "error") config.amount = client.config.defaultCooldown * 1000
          
           
         }
         const cmdcooldown = await db.get(`${msg.guild.id}.cooldowns.${msg.author.id}.${cmd.name}`)
         if (!cmdcooldown || cmdcooldown === null) {
          const expirationTime = Date.now() + config.amount
          db.set(`${msg.guild.id}.cooldowns.${msg.author.id}.${cmd.name}`, expirationTime)
          setTimeout(() => db.delete(`${msg.guild.id}.cooldowns.${msg.author.id}.${cmd.name}`), config.amount)
         } else {
          const expire = cmdcooldown - Date.now()
          if (expire > 0) {
            const parsed = parse(expire)
            const time = []
            if (parsed.seconds > 0) time.push(parsed.seconds + " sekund")
            if (parsed.minutes > 0) time.push(parsed.minutes + " minut")
            if (parsed.hours > 0) time.push(parsed.hours + " godzin")
            if (parsed.days > 0) time.push(parsed.days + " dni")
            const amount = f.betterjoin(time.reverse())
            const commandName = msg.prefix + cmdName
            const content = config.message.content ? config.message.content.replace("$amount", amount).replace("$cmd", commandName) : ""
            let embed = ""
            if (config.message.embed) {
              embed = new MessageEmbed()
              .setTitle(config.message.embed.title.replace("$amount", amount).replace("$cmd", commandName))
              .setColor(config.message.embed.color)
              .setDescription(config.message.embed.description.replace("$amount", amount).replace("$cmd", commandName))
              if (config.message.embed.footer) embed.setFooter(config.message.embed.footer.replace("$amount", amount).replace("$cmd", commandName))
            }
            return msg.channel.send(content, embed)
            
          }
            
         }
       } 
       

      
        try {
           cmd.run(msg, args, cmdName)
        } catch(error) {
          // Wysyła informację o błędzie
            console.log(error)
            if (botversion === "S") {
            channel.send("Podczas wykonywania tej komendy wystąpił błąd. Raport z tym błędem został wysłany do programistów bota, którzy postarają się go jak najszybciej naprawić. ")
            const link = await haste.post(error)
            const embed = new MessageEmbed()
            .setColor(f.colorToHex("red"))
            .setTitle("Błąd")
            .setDescription(`**Typ błędu:** bład podczas wykonywania komendy. \n**Komenda:** ${cmd.name} \n**Użytkownik:** <@${msg.author.id}> \n**Typ kanału:** ${msg.channel.type === "text" ? "serwer" : "DM"} \n**Błąd:** [zobacz](${link})`)

            w.send(embed)
            } else {
              channel.send("No i error.")
            }
        }
           
        
      
    
      
      
        
        
      
              
              
               
      })
}