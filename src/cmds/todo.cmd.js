const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const f = require(__dirname + "/../functions.js")

module.exports = {
    name: "todo",
    category: "tools",
      description: "Wyświetla listę ToDo",

    run(msg, args) {
   
    let nosnipe = f.customEmoji('bad') + " **Twoje ToDo jest puste**"
      if (!db.get(`todo.${msg.author.id}`)) return msg.channel.send(nosnipe)
      if (!db.get(`todo.${msg.author.id}`)) return msg.channel.send(nosnipe)
      if (db.get(`todo.${msg.author.id}`).length < 1) return msg.channel.send(nosnipe)

      const toded = db.get(`todo.${msg.author.id}`)

     
        const embed = new MessageEmbed()
        .setTitle("Todo")
        .setColor(f.colorToHex("lightblue"))
        .setDescription(toded.map(m => `**${toded.indexOf(m) + 1}. **${m.content}`).join("\n"))
        msg.channel.send(embed)

    }
}