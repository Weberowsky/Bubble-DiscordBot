const fetch = require('node-fetch');
const Discord = require("discord.js")
const f = require(__dirname + "/../functions.js")
const got = require('got')


module.exports = {
    name:"mem",
    description:"Wysyła losowego mema.",
    category: "fun",
    aliases: ["meme"],
  

    async run(msg) {
      const db = client.db
      const { mem } = await fetch('http://api.filipek.cf/mem/').then(response => response.json());
      let user = msg.author;
      if (!await db.get(msg.guild.id + ".premium") == 'tak') {
        let author = await db.fetch(`mem_${msg.guild.id}_${user.id}`)
  
        let timeout = 2000;
        await db.set(`mem_${msg.guild.id}_${user.id}`, Date.now())
        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));
        
            let timeEmbed = new Discord.MessageEmbed()
            .setTitle("Zwoooolnij trochę!")
            .setColor("#f00a0a")
            .setDescription(f.customEmoji("no") + ` Pewnie nie zdążyłeś nawet przeczytać poprzedniego mema <:kekw:772756182996877352>\nAle nie ważne. Chcesz wysyłać memy z prędkością światła? Ulepsz serwer do wersji Premium lub poczekaj *${time.seconds} sekund** `);
            msg.channel.send(timeEmbed)
            return;
          }       
      }
   
      let emb = new Discord.MessageEmbed()
      .setImage(mem, "Mem")
      .setColor('RANDOM')
      .setTitle("Oto twój mem")
      .setFooter(`Wywołano przez ${msg.author.tag}`, msg.author.displayAvatarURL())
     msg.channel.send(emb)  
}
  }
