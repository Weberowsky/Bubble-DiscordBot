const { MessageEmbed } = require("discord.js")
const f = require(__dirname + "/../functions.js")

module.exports = {
    name: "pies",
    aliases: ["pieseł", "dog", "doggo" ],
    description: "Wysyła losowe zdjęcie psa.",
    category: "fun",

    async run(msg) {

        const { channel, client: { axios } } = msg

        async function getImage () {
            async function randomImage () {
                const data = await axios.get("https://random.dog/woof.json")
                const { url } = data.data
                return url
            }

            

            const url = await randomImage()
            let validurl = url

            while(url.endsWith(".mp4") || url.endsWith(".gif")) {
                await randomImage()
                validurl = url

               
            }

            
            
            return validurl
        }
    
        

        const embed = new MessageEmbed()
        .setColor(`#00ff59`)
        .setTitle(":dog: Oto Twój pies!")
        .setImage(await getImage())
        .setTimestamp()
      
    

    
        channel.send(embed)
    
    }
}