const { MessageEmbed } = require("discord.js")
const f = require(__dirname + "/../functions.js")

module.exports = {
    name:"kot",
    description:"Wysyła zdjęcie losowego kota.",
    category: "fun",
    aliases: ["kociak", "cat"],
    async run(msg) {
      const { client: {axios} } = msg

      const data = await axios.get("http://random.cat")
      const cat = data.data.split('"').filter(s => s.startsWith("https://")).slice(0, 1).join("")
      

      const embed = new MessageEmbed()
      .setTitle(":cat: Oto Twój kot!")
      .setImage(cat)
      .setColor(`#00FF59`)
.setTimestamp()
.setFooter(`Wywołano przez: ${msg.author.username}`,  msg.author.displayAvatarURL())
      msg.channel.send(embed)
  }
}