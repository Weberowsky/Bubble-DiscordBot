module.exports = {
    name: "guildDelete",

    run() {
        client.user.setActivity(`@Bubble || ${client.guilds.cache.size} serwerów`, { type: "WATCHING" })
    }
}