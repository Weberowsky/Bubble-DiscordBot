const db = client.db

module.exports = {
    name:"gunban",
    description:"Wyłącza użytkownikowi możliwość korzystania z bota.",
    aliases: ["ungban"],
    devlvl: 3,
    args: 1,
    ussage: "<id> [powód]",
    run(msg, args) {
      const user = client.users.cache.get(args[0])
      const reason = args.slice(1).join(" ").length > 0 ? args.slice(1).join(" ") : "Brak"
      if (!user || [null, undefined].includes(`global.bans.${user.id}`)) return msg.channel.send(f.customEmoji("bad") + " Nie można globalnie odbanować użytkownika. Powód: użytkownik nie jest globalnie zbanowany.")
      
      db.delete(`global.bans.${user.id}`)
      const embed = f.moderationEmbed("Unban globalny", "unban globalny", msg.author.id, reason)
      user.send(embed).catch(e => msg.channel.send("Użytkownik został globalnie odanowany, ale nie można było wysłać do niego wiadomości, aby go o tym poinformować."))
      const embed2 = f.moderationEmbed("Unban globalny dla " + user.username, "uban globalny", msg.author.id, reason)
      msg.channel.send(embed2)
  }
    

    
}