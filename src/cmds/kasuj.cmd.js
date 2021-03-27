const { MessageEmbed, MessageAttachment ,Permissions: {FLAGS} } = require("discord.js")
const chalk = require("chalk")
const hastebin = require("hastebin-gen")
const f = require(__dirname + "/../functions.js")

FLAGS.MANAGE_MESSAGES
module.exports = {
    name: "clear",
    description: "Kasuje wiadomości.",
    category: "admin",
    guildOnly: true,
    args: 1,
    ussage: "<liczba>",
    aliases: ["skasuj", "kasuj"],
    botPermissions: [FLAGS.MANAGE_MESSAGES],
    botTextPermissions: "zarządzanie wiadomościami",
    userPermissions: [FLAGS.MANAGE_MESSAGES],
    userTextPermissions: "zarządzanie wiadmościami",
    async run(msg, args) {

   
       
      
     
      
      const amount = parseFloat(args[0])
      if (!Number.isInteger(amount)) {
          return msg.channel.send( f.customEmoji("no") + " Podaj prawidłową liczbę wiadomości, które chcesz usunąć")
          
      }
      
      if (amount < 1 || amount >= 100) {
        return msg.channel.send(f.customEmoji("no") + " Liczba wiadomości do usunięcia musi być większa od `0` i mniejsza od `100`.")
      }

     msg.channel.messages.fetch({ limit: amount }).then(messages => { 
        let lastMessage = messages.first(amount);
        msg.channel.bulkDelete(amount + 1).then(deleted => {
        
          const embed = new MessageEmbed()
          .setTitle(`Usunięto ${amount} wiadomości`)
          .setColor("#ff0000")
          .setDescription(`Pomyślnie usunięto \`${deleted.size - 1}\` wiadomości.\nUsunięte wiadomości możesz zobazcyć klikając [tutaj](https://bubble.tk/deleted-messages.html?server=${msg.guild.id}?channel=${msg.channel.id}?funcID='0001')`)
          .setFooter(`Wywołano przez: ${msg.author.username}`)
          .setTimestamp()
          msg.channel.send(embed)
     
 
    
 
          
      })})


     
      
  
      
       
        .catch();
      }
    }
  
