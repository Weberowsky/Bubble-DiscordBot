const db = client.db
const Canvas = require("canvas")
const { MessageAttachment } = require("discord.js")

module.exports = {
    name: "poziom",
    description: "Wyświetla aktualny poziom.",
    aliases: ["level", "lvl", "rank"],
    ussage: "[użytkownik]",

    async run (msg, args) {
        const lvls = [100]
        const exp = [null, undefined].includes(await db.get(`${msg.guild.id}.exp.${msg.author.id}`)) ? 0 : await db.get(`${msg.guild.id}.exp.${msg.author.id}`)
        while (lvls[lvls.length - 1] <= exp) {
            lvls.push(lvls[lvls.length - 1] + 150 + lvls.length * 5)
        }

        const precents = (exp / lvls[lvls.length - 1]).toFixed(2) * 100
        const lvl = lvls.indexOf(lvls.filter(e => e <= exp).slice(-1)[0]) + 1 < 1 ? 0 : lvls.indexOf(lvls.filter(e => e <= exp).slice(-1)[0]) + 1
        
        const canvas = Canvas.createCanvas(650, 300)
        const ctx = canvas.getContext("2d")
        const canvasConfig = {
            avatar: {
                width: 150,
                height: 150,
                x: 40,
            },
            text: {
                font: "40px sans-serif",
                color: "white",
            },
            loadRect: {
                toLoadColor: "grey",
                loadedColor: "white",
                textColor: "black",
                textFont: "22px sans-serif",
            },
            
        }
        canvasConfig.avatar.y =  ((canvas.height - canvasConfig.avatar.height) / 2) - 20

        const background = await Canvas.loadImage(__dirname + "/../images/wallpapers/space.jpg")
        const avatar = await Canvas.loadImage(msg.author.displayAvatarURL({
            format: "png",
            dynamic: false,
        }))

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        ctx.font = canvasConfig.text.font
        ctx.fillStyle = canvasConfig.text.color
        ctx.fillText(msg.member.displayName, 240, 80)
        ctx.font = "30px sans-serif",
        ctx.fillText(`Poziom: ${lvl}`, 240, 135)
        ctx.fillText(`XP: ${exp}`, 240, 175)
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
          if (w < 2 * r) r = w / 2;
          if (h < 2 * r) r = h / 2;
          this.beginPath();
          this.moveTo(x+r, y);
          this.arcTo(x+w, y,   x+w, y+h, r);
          this.arcTo(x+w, y+h, x,   y+h, r);
          this.arcTo(x,   y+h, x,   y,   r);
          this.arcTo(x,   y,   x+w, y,   r);
          this.closePath();
          return this;
        }

        ctx.fillStyle = canvasConfig.loadRect.toLoadColor
        ctx.fillRect(40, canvas.height - 60, canvas.width - 80, 30)
        ctx.fillStyle = canvasConfig.loadRect.loadedColor
        ctx.fillRect(40, canvas.height - 60, (precents / 100) * (canvas.width - 80), 30)
        ctx.roundRect(35, 10, 225, 110, 20).stroke(); //or .fill() for a filled rect
        
        ctx.fillStyle = canvasConfig.loadRect.textColor
        const text = `Ukończono ${precents}% (${exp} / ${lvls[lvls.length - 1]})`
        ctx.font = canvasConfig.loadRect.textFont
        ctx.fillText(text, 50, canvas.height - 40)
        ctx.beginPath()
        ctx.arc(canvasConfig.avatar.x + (canvasConfig.avatar.width / 2), canvasConfig.avatar.y + (canvasConfig.avatar.height / 2), canvasConfig.avatar.height / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(avatar, canvasConfig.avatar.x, canvasConfig.avatar.y, canvasConfig.avatar.width, canvasConfig.avatar.height)

        const attachment = new MessageAttachment(canvas.toBuffer(), "level.png")
        msg.channel.send(attachment)
    }
}
