const { MessageEmbed, Message } = require('discord.js');
const f = require(__dirname + "/../functions.js")
const hastebin = require("hastebin-gen");

module.exports = {
    name:"eval",
    description:"Wykonuje dowolny kod.",
    devlvl: 3,
    args: 1,
    ussage:"<kod>",
    async run(msg, args, cmdName, db) {
     
     
      try {
      const code = args.join(" ");
      const ember = new MessageEmbed()
      .setTitle(`:shield: Bubble Defender`)
 .setDescription(`Wykryto próbę naruszenia bezpieczeństwa bota.\nZakres: **Eval**\nOperacja: **Próba wyświetlenia tokenu bota**\nWynik: **Opercja zablokowana**`)
  .setColor('RED')
  .setFooter(msg.author.tag, msg.author.displayAvatarURL())

      if (code.includes("client.token") || code.includes("token")) return msg.channel.send(ember)
      let evaled = await eval(code)
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled)

      let response = `Kod wejściowy: \`\`\`HTTP\n${code}\n\`\`\` \nKod wyjściowy: \`\`\`YAML\n${evaled}\`\`\` `
      if (response.length >= 2000) {
        response = `Kod wejściowy: ${code} \nKod wyjściowy: ${evaled}`

     
        const haste = await hastebin(evaled, { extension: "txt" });
        const embed = new MessageEmbed()
        .setTitle("Błąd")
        .setColor(f.colorToHex("red"))
        .setTimestamp()
        .setDescription(`Otrzymany kod był zbyt długi, aby wysłać go jako wiadomość na discordzie. Możesz jednak zobaczyć go klikając [tutaj](${haste}).`)

        return msg.channel.send(embed)
      }
      const rpembed = new MessageEmbed()
      .setTitle("Eval")
      .addField(`:inbox_tray: **Kod wejściowy:**`, `\`\`\`${code}\`\`\``)
      .addField(":outbox_tray: **Kod wyjściowy:**", `\`\`\`${evaled}\`\`\``)
      .setColor('#00ff59')
      .setFooter(`Wywołano przez: ${msg.author.username}`,  msg.author.displayAvatarURL())
      .setTimestamp()
      await msg.channel.send(rpembed);
    } catch(e) {
      const blad = new MessageEmbed()
      .setTitle("Wystąpił błąd")
    .setDescription(`${f.customEmoji("no")} Podano nieprawidłowy kod. \nBłąd: \`\`\`${e}\`\`\``)
      .setTimestamp()
      .setColor(f.colorToHex("red"))
      msg.channel.send(blad)
    }
    
    
    }
  }
