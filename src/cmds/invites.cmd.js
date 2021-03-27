const { Permissions: { FLAGS }, MessageEmbed } = require("discord.js");
module.exports = {
    name: "invites",
    category: 'mod',
    botPermissions: [FLAGS.MANAGE_GUILD],
    botTextPermissions: "zarządzanie serwerem",
    guildOnly: true,

   async run(message, args) {
    var user = null;
  if (message.mentions.members.first()) {
      user = message.mentions.members.first()
  } else {
      user = message.author
  }
    
    message.guild.fetchInvites()
    .then

    (invites =>
        {
            const userInvites = invites.array().filter(o => o.inviter.id === user.id);
            var userInviteCount = 0;
                for(var i=0; i < userInvites.length; i++)
                {
                    var invite = userInvites[i]; 
                    userInviteCount += invite['uses'];
                  
                }
                if (message.mentions.members.first()) {
                    let emb = new MessageEmbed()
                    .setTitle(`Zaproszenia ${user.user.tag}`)
                    .addField(`Łącznie`, userInviteCount)
                   
                    .setColor(f.colorToHex('lightblue'))
                    .setFooter(`Wywołano przez ${message.author.tag}`)
                    message.channel.send(emb)
                } else {
                    
              
                    let emb = new MessageEmbed()
                    .setTitle(`Zaproszenia ${user.tag}`)
                    .addField(`Łącznie`, userInviteCount)
                   
                    .setColor(f.colorToHex('lightblue'))
                    .setFooter(`Wywołano przez ${message.author.tag}`)
                    message.channel.send(emb)
                }
        }
    )
   }
    }
