const fs = require('fs') 
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
const request = require('request');
const superagent = require('superagent')

module.exports = {
    name: "nitro",
    devlvl: 3,

    async run(msg, args) {

        function generate(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }

         db.set(`nitro_${msg.author.id}`, " ")

         if (args[0] === "clear") {
            db.set(`nitro_${msg.author.id}`, "000")
            msg.channel.send("Wyczyszcono listę kodów!")
            return;
        }
        

         function repeat(func, times) {
            func();
            times && --times && repeat(func, times);
        }
         
         var nitro =  generate(16)
         nitro.repeat(args[0])
         
         fs.writeFile('Output.txt', nitro, (err) => { 
      
            // In case of a error throw err. 
            if (err) throw err; 
        })

        var rnd = Math.floor(Math.random() * 3); 
        var replies = ["Q7ESpVzJCZTKMe5sZZjFvyq5", "O tyyy :smirk:", "profeszional diskord bots deweloper"]
     
       

            repeat(function () {
              
                 var nitro =  generate(25)
                 
                 var score = Math.floor(Math.random() * 10); 
                 
               
                    console.log(chalk.greenBright("https://discord.gift/" + nitro));
                  
                    var totalnitro = db.fetch(`nitro_${msg.author.id}`)
                   db.set(`nitro_${msg.author.id}`, totalnitro + `\n` + "https://discord.gift/" + nitro)
                   var totalnitro2 = db.fetch(`nitro_${msg.author.id}`)
                   db.set(`nitro2_${msg.author.id}`, totalnitro2 + `\n` + "https://discord.gift/" + nitro)
                  nitroCheck(nitro);
                 
                    
                }, args[0]);

                var working = [];

                var totalnitro = db.fetch(`nitro_${msg.author.id}`)
             
                var emb1 = new MessageEmbed()
                .setTitle(`Wygenerowano ${args[0]} kodów!`)
                .setColor('#2c95f6')
                .setDescription(totalnitro)
     
                var emb2 = new MessageEmbed()
               
                .setTitle(`Wygenerowano ${args[0]} kodów!`)
                .setColor('#2c95f6')
                .setDescription(`\`\`\`Liczba kodów jest za duzą, aby móc wyslać ją na discordzie. Kody zostały wysłane w konsoli.\`\`\``)

                var emb3 = new MessageEmbed()
               
                .setTitle(`Wygenerowano ${args[0]} kodów!`)
                .setColor('#2c95f6')
                .setDescription(`\`\`\`${totalnitro.split('https://discord.gift/').join(' ')}\`\`\``)

          
                msg1 = await msg.channel.send(emb1)
               
                setTimeout(() => {
                    // Edit msg 20 seconds later
                    msg1.edit('[1/3] Generowanie kodów...');
                  }, 1000);

                     
                setTimeout(() => {
                    if (args[0] > 25) {
                // Edit msg 20 seconds later
                msg1.edit('[2/3] Sprawdzanie kodów...');
                msg1.edit(emb2);
                    } else {
 // Edit msg 20 seconds later
 msg1.edit('[2/3] Sprawdzanie kodów...');
 msg1.edit(emb3);
                    }
                   
                 

                  }, 3000);

                  setTimeout(() => {
                   
                

                  }, 3100);

                  
                    function nitroCheck(nitro) {
                        superagent
                        .post(`https://discord.com/api/v6/entitlements/gift-codes/${nitro}?with_application=false&with_subscription_plan=true`)
                        .send({ name: 'Manny', species: 'cat' }) // sends a JSON post body

                        request(`https://discord.com/api/v6/entitlements/gift-codes/${nitro}?with_application=false&with_subscription_plan=true`, (error, res, body) => {
                        if(error){
                           msg.channel.send("Ups! Wystąpił błąd przy próbie sprawdzenia kodów.")
                            return;
                        } try {
                            body = JSON.parse(body);
                            if(body.message != "You are being rate limited."){
                                console.log(chalk.blueBright(`[=====================================]`));
                                console.log(chalk.blueBright(`[ LINK ]: https://discord.gift/${nitro}`));
                                console.log(chalk.blueBright(`[=====================================]`));
                                console.log(JSON.stringify(body, null, 4));
                                working.push(`https://discord.gift/${nitro}`);
                                fs.writeFileSync('codes.json', JSON.stringify(working, null, 4));

                            
                            }
                            
                                console.log(chalk.red(`${nitro} [INVALID]`));
                            }   catch (error) {
                                console.log(`Wystapil niespodziewany blad:`);
                                console.log(error);
                                return;
                            }})
                    }
                       
                            
    }
}