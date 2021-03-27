const { MessageEmbed } = require("discord.js")


module.exports = {
    name: "amongus",
    description: "Wysyła screen z gry Among Us.",
    aliases: ["among us", "among-us"],
    category: "fun",
    args: 2,
    ussage: "<nick> (czy jest impostorem) <tak/nie>",

    async run(msg, args) {

        const imposter1 = args[1]
        const imposter2 = imposter1.replace("tak", "true")    
        const imposter3 = imposter2.replace("nie", "false") 

        const rnd = Math.floor(Math.random() * 9); 
        const color = ["orange", "red", "yellow", "pink", "white", "purple", "black", "green", "lime"]
      

        let emb = new MessageEmbed()
        .setImage(`https://vacefron.nl/api/ejected?name=${args[0]}&imposter=${imposter3}&crewmate=${color[rnd]}`)
        .setColor('RANDOM')
        .setTitle("Among us")
        .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL())
       msg.channel.send(emb)  

        } }