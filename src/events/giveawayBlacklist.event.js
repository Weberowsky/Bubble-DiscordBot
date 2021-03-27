const { MessageEmbed } = require("discord.js")
const db = client.db

module.exports = {
    name: "messageReactionAdd",
    async run(reaction, user) {
        if (reaction.partial) {
            reaction = await reaction.fetch()
            user = reaction.user
        }
        if (reaction.emoji.name != "🎉" || user.bot || !reaction.message.guild) return
        const giveaways = db.get(`${reaction.message.guild.id}.giveaways`)
        if (!giveaways || giveaways === null) return
        const giv = Object.values(giveaways).find(e => e.message === reaction.message.id)
        if (!giv) return
        if (giv.blacklist.some(e => user.roles.cache.has(e))) {
            reaction.users.remove(user)
            return user.send(`${f.customEmoji("bad")} Nie możesz wziąć udziału w tym giveawayu, gdyż znajdujesz się na blackliście.`)
        }

    }
}