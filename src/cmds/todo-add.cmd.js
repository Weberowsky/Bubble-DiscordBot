const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const f = require(__dirname + "/../functions.js")

module.exports = {
    name: "todo-add",
    category: "tools",
    description: "Dodaje element do ToDo",
    ussage: "<wartość>",

    run(msg, args) {

        theargs = args.join(" ")
        
        
        db.push(`todo.${msg.author.id}`, {
            content: theargs,
            author: msg.author.id,
            
        })
        

        const embed = new MessageEmbed()
        .setTitle("Dodano do ToDo")
        .setColor(f.colorToHex("lightblue"))
      .setDescription(`Pomyślnie dodano **${theargs}** do Twojego ToDo!`)
        msg.channel.send(embed)
    }
}