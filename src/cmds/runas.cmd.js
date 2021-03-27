const { MessageEmbed } = require('discord.js');
const f = require(__dirname + "/../functions.js")

module.exports = {
    name: "run-as",
    description: "Wykonuje komendę jako wybrany uzytkownik.",
    category: "dev",
    devlvl: 3,
    args: 2,
    ussage: "<ID użytkownika> <wiadomość>",

    async run(msg, args) {
       
        const id = args[0]
        if (id === "717671217091444819") return message.channel.send('A co mi się będziesz pod filipka podszywał ty pseudo-filipku ty...')
        msg.author = client.users.cache.get(`"${id}"`)
        msg.content = args.join(" ").slice(19)
        console.log(msg.content)
        output = client.emit("message", msg)
       
            const code = (`msg.content = "${args.join(" ").slice(19)}"
            msg.author = client.users.cache.get("${id}")
        
            client.emit("message", msg)`);
            if (code.includes("client.token")) return msg.channel.send("Uuu, nie ładnie tak! :smirk:")
            let evaled = await eval(code)
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
      
          
       
          
          }     }
        
