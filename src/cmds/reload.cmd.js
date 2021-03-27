const fs = require("fs")
const f = require(__dirname + "/../functions.js")
const ascii = require("ascii-table")
const { waitForDebugger } = require("inspector")

const table = new ascii().setHeading("Komenda","Status załadowania", "Uwagi")


module.exports = {
    name: "reload",
    devlvl: 3,
    description: "Przeładowuje komendy.",
    cooldown: 3,
    // args: 1,
    // ussage: "<komenda>",
    aliases: ["rl", "rel"],

    run (msg, args) {
        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith(".cmd.js"))
        for (const file of commandFiles) {
            delete require.cache[require.resolve("./" + file)];
            const command = require(__dirname + `/${file}`)
            const errors = []
            if (command.name) {
                client.commands.set(command.name, command)
                if (!command.description) errors.push("Komenda nie posiada opisu.")
                if (!command.category && !command.devlvl) errors.push("Komenda nie posiada kategori.")
                if (command.onlyGuild) {
                    errors.push("⚠ Komenda zawiera pole 'onlyGuild', które zostało zastąpione na 'guildOnly' w wersji 1.0.1.")
                } else if((command.userPermissions || command.botPermissions) && !command.guildOnly) {
                    errors.push("⚠ Komenda zawiera pole `uprawnienia`, lecz nie zawiera 'guildOnly'")
                }
                if(!errors.length) errors.push("Brak")
                table.addRow(file,"✅", errors.join(", "))
            } else {
                table.addRow(file,"❌ - brakuje pola 'name'", "<---")
                continue
            }
        }
        // Wyświetla tablice komend.
        console.log(table.toString())

      
        msg.channel.send(`:arrows_counterclockwise: **Pomyślnie przeładowano komendy** \`(${client.commands.size} / ${client.commands.size})\`.`)

     
}
}