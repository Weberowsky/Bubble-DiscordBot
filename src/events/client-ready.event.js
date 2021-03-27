const log = console.log
const axios = require("axios")
const chalk = require("chalk")
const { Collection, MessageEmbed } = require("discord.js")
const db = client.db
const { prefix, betaprefix } = require(__dirname + "/../config/config.js")
const moment = require("moment")
moment.locale("pl")

module.exports = {
    name: "ready",

    async run() {
        client.stable = !client.user.username.toLowerCase().includes("beta")
        client.prefix = client.stable ? prefix : betaprefix

        log(chalk.green(`Zalogowano jako`), chalk.blue(`${client.user.tag}`), chalk.green("!"))
        log(chalk.green('Pomyślnie uruchomiono bota.'))
        client.user.setActivity(`@Bubble || ${f.numberEnd(client.guilds.cache.size, "serwerów")}`, { type: "WATCHING" })
        client.guilds.cache.forEach(guild => {
            if (!db.get(guild.id)) db.set(guild.id, {})
            guild.prefix = db.get(guild.id + ".prefix") ? db.get(guild.id + ".prefix") : client.prefix
            guild.members.fetch()

            //Odpala cooldowny
            const cooldowns = db.get(`${guild.id}.cooldowns`)
            const users = Object.keys(cooldowns === undefined || cooldowns === null ? {} : cooldowns)
            users.forEach(u => {
                const cooldown = db.get(`${guild.id}.cooldowns.${u}`)
                const cooldownArray = Object.keys(cooldown)
                cooldownArray.forEach(c => setTimeout(() => db.delete(`${guild.id}.cooldowns.${u}.${c}`), cooldown[c] - Date.now()))
            })

            //Odpala giveawaye
            const giveaways = db.get(`${guild.id}.giveaways`) || null
            if (giveaways === null) return
            Object.keys(giveaways).forEach(async e => {
                let giv = db.get(`${guild.id}.giveaways.${e}`)
                const msg = await guild.channels.cache.get(giv.channel).messages.fetch(giv.message)
                const givEmbed = msg.embeds[0]
                const member = msg.guild.members.cache.get(giv.organizer)
                setTimeout(async () => {
                    giv = db.get(`${guild.id}.giveaways.${e}`) || null
                    if (giv === null) return
                    if (!giv.active) return
                    db.set(`${guild.id}.giveaways.${e}.active`, false)
                    const toWin = msg.guild.members.cache.filter(m => msg.reactions.cache.get("🎉").users.cache.filter(u => !u.bot).map(u => u.id).includes(m.user.id) && !giv.blacklist.some(b => m.roles.cache.has(b)))
                    const members = toWIn.random(giv.winers).length > 0 ? toWin : ["Brak"]
                    const deleted = await msg.reactions.cache.get("🎉").remove().catch(e => {
                        if (e.toString().slice("DiscordAPIError: ".length) === "Unknown Message") return true
                        return false
                    })
                    if (deleted === true) {
                        const errorEmbed = new MessageEmbed()
                            .setColor(f.colorToHex("red"))
                            .setTitle("Giveaway - błąd")
                            .setDescription("Wiadomość z giveawayem została skasowana.")
                        db.delete(`${msg.guild.id}.giveaways.${giveawayId}`)
                        return msg.channel.send(errorEmbed)
                    }
                    givEmbed.setTitle("Giveaway - zakończono")
                        .setDescription("Giveaway się zakończył.")
                        .spliceFields(1, 1)
                        .spliceFields(2, 4)
                        .addField("Zwycięzcy:", f.betterjoin(members.map(m => !m ? "Brak" : m.toString())))
                        .addField("Giveaway zakończył się:", moment(new Date(giv.timeEnd)).format("DD MMMM (dddd) YYYY r. HH:mm:ss"))
                    msg.edit(givEmbed)

                    if (members[0] === "Brak") {
                        const endMessage = await msg.channel.send(member.toString())
                        const endEmbed = new MessageEmbed()
                            .setColor(f.colorToHex("red"))
                            .setTitle("Giveaway - błąd")
                            .setDescription(`Nikt nie wziął udziału w [giveawayu](${msg.url}). ~~Może nikt nie chciał nagrody.~~`)
                        db.delete(`${msg.guild.id}.giveaways.${giveawayId}`)
                        return endMessage.edit("", endEmbed)
                    } else {
                        const endEmbed = new MessageEmbed()
                            .setColor(f.colorToHex("lightgreen"))
                            .setDescription(`[Giveaway](${msg.url}) się zakończył.`)

                        const endMessage = await msg.channel.send(member.toString() + ", " + f.betterjoin(members.filter(e => e)))
                        endMessage.edit("", endEmbed)
                        members.filter(e => e).forEach(m => {
                            giv.roleGiven.forEach(async (r) => await m.roles.add(r).catch(e => msg.author.send(`Użytkownik **${m.displayName}** wygrał, ale nie mogłem mu nadać roli **${r.name}**.`)))
                            giv.roleTaken.forEach(async (r) => await m.roles.remove(r).catch(e => msg.author.send(`Użytkownik **${m.displayName}** wygrał, ale nie mogłem mu zabrać roli **${r.name}**.`)))
                        })

                    }
                    if (giv.roleGiven && giv.roleTaken) db.set(`${msg.guild.id}.giveaways.${giveawayId}.winMembers`, toWin.map(m => m.user.id))
                    db.set(`${msg.guild.id}.giveaways.${giveawayId}.members`, toWin.map(m => m.user.id))
                    setTimeout(() => db.delete(`${guild.id}.giveaways.${e}`), 24 * 60 * 60 * 1000)
                }, giv.timeEnd - Date.now())
            })


        })

        //Zarządza ustawieniami
        client.settings = new Collection()
        const settings = require(__dirname + "/../config/settings.js")
        settings.forEach(s => {
            client.settings.set(s.name, s)
            client.guilds.cache.forEach(g => {
                if ([undefined, null].includes(db.get(`${g.id}.${s.name}`)) && s.default) db.set(`${g.id}.${s.name}`, s.default)
            })
        })

        if (!db.get("global")) db.set("global", {})

        client.fakeToken = (await axios.get("https://some-random-api.ml/bottoken")).data.token

    }
}
