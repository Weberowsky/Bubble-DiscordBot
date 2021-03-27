const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const f = require(__dirname + "/../functions.js")

module.exports = {
    name: "todo-clear",
    category: "tools",
 description: "Czyści listę ToDo",

    run(msg, args) {
        const sniped = db.get(`${msg.guild.id}.todo.${msg.author.id}`)
        theargs = args.join(" ")
        db.delete(`todo.${msg.author.id}`, {
        
        })
        const embed = new MessageEmbed()
        .setTitle("Wyczyszczono ToDo")
        .setColor(f.colorToHex("lightblue"))
      .setDescription(`Pomyślnie wyczyszczono tablicę ToDo`)
        msg.channel.send(embed)
    }
}