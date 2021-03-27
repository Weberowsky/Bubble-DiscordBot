module.exports = {
    name: "newcmd",
    description: "Dodaje komendę.",
    category: "dev",
    devlvl: 3,

    run(msg, args) {
        client.commands.add(args)
    }
}