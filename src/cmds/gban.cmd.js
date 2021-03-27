const db = client.db

module.exports = {
    name:"gban",
    description:"Wyłącza użytkownikowi możliwość korzystania z bota.",
    devlvl: 3,
    args: 1,
    ussage: "<id> [powód]",
    run(msg, args) {
      const user = client.users.cache.get(args[0])
      const reason = args.slice(1).join(" ").length > 0 ? args.slice(1).join(" ") : "Brak"
      if (!user) return msg.channel.send(f.customEmoji("bad") + " Nie można globalnie zbanować użytkownika. Powód: użytkownik nie korzysta z bota.")
      const { userprogramperms } = f.userProgramPerms(user.id)
      if (user.id === msg.author.id || user.id === client.user.id) return msg.channel.send(f.customEmoji("bad") + " Nie możesz globalnie zbanować siebie ani bota.")
      if (userprogramperms > 2) return msg.channel.send(f.customEmoji("bad") + " Nie możesz globalnie zbanować programisty.")
      if (user.bot) return msg.channel.send(f.customEmoji("bad") + " Co ty? Bota chcesz globalnie zbanować?")
      if (!db.get("global.bans")) db.set("global.bans", {})
      db.set("global.bans." + user.id, reason)
      
      const embed = f.moderationEmbed("Ban globalny", "ban globalny", msg.author.id, reason)
      user.send(embed).catch(e => msg.channel.send("Użytkownik został globalnie zbanowany, ale nie można było wysłać do niego wiadomości, aby go o tym poinformować."))
      const embed2 = f.moderationEmbed("Ban globalny dla " + user.username, "ban globalny", msg.author.id, reason)
      msg.channel.send(embed2)
  }
    

    
}