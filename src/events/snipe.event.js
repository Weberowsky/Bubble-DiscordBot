const db = client.db

module.exports = {
    name: "messageDelete",
    async run (msg) {
        if (!msg.guild) return
        if (msg.author.bot) return
        if (!await db.get(msg.guild.id + ".snipe")) db.set(msg.guild.id + ".snipe", {})
        if (!await db.get(`${msg.guild.id}.snipe.${msg.channel.id}`)) db.set(`${msg.guild.id}.snipe.${msg.channel.id}`, [])
        if (await db.get(`${msg.guild.id}.snipe.${msg.channel.id}`).length > 30) {
            db.delete(`${msg.guild.id}.snipe.${msg.channel.id}`)
        } else {
        db.push(`${msg.guild.id}.snipe.${msg.channel.id}`, {
            content: msg.content,
            author: msg.author.id,
        })
    }

    }

}
