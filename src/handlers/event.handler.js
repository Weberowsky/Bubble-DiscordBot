const fs = require("fs")
const f = require(__dirname + "/../functions.js")
const chalk = require("chalk")
const { Constants: { Events } } = require("discord.js")
const cmd = require("node-cmd")
const { botversion } = require(__dirname + "/../config/config.js")

const { dirname } = require("path")

const serverEvents = Object.values(Events)

module.exports = (client) => {
    const events = fs.readdirSync(__dirname + "/../events").filter(file => file.endsWith("event.js"))
    //process.on("uncaughtException", async (error) => {
        //const link = await haste.post(error)
        //const embed = new MessageEmbed()
        //.setColor(f.colorToHex("red"))
        //.setTitle("Błąd")
        //.setDescription(`**Typ błędu:** uncaughtException. \n**Błąd:** [klik](${link})`)

       // w.send(embed)

    //})
   

    for (const file of events) {
        const event = require(__dirname + `/../events/${file}`)
        
        if(!event.run) {
             console.log(chalk.red(`W pliku ${file} brakuje funkcji 'run'.`))

             process.exit(1)
        
        } else if(typeof event.run != "function") {
            console.log(chalk.red(`W pliku ${file} 'run' nie jest funkcją.`))
            process.exit(1)
        }

        if (serverEvents.includes(event.name)) {
             client.on(event.name, event.run)
        
            } else {

                console.log(chalk.red(`Event ${event.name} w pliku ${file} nie istnieje.`))

                process.exit(1)
                
            }

        
      
        }
    }

