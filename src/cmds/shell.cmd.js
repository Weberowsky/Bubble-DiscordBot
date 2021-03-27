const { MessageEmbed } = require("discord.js")
const cmd = require("node-cmd")

module.exports = {
  name: "shell",
  devlvl: 3,
  args: 1,
  ussage: "<kod>",
  category: "dev",
  description: "Uruchamia polecenie w konsoli.",
  
  run (msg, args) {
     const code = args.join(" ")
     cmd.get(code, (err, data, stderr) => {
        if (err) return msg.channel.send(err)
        console.log('======= SHELL ========')
        console.log('Kod: ' + code)
        console.log('Wynik: ' + data)
        
        if (!data) {
        var data = "Polecenie nic nie zwróciło"
        }
      const embed = new MessageEmbed()
       .setTitle("Shell")
      .addField(`:inbox_tray: **Kod wejściowy:**`, `\`\`\`${code}\`\`\``)
      .addField(":outbox_tray: **Kod wyjściowy:**", `\`\`\`${data}\`\`\``)
      .setColor('#00ff59')
      .setFooter(`Wywołano przez: ${msg.author.username}`,  msg.author.displayAvatarURL())
      .setTimestamp()

      msg.channel.send(embed)
})
  }
 }