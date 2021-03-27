//-------------------------------------
//          Jak używać?               -
//-------------------------------------


//Importowanie:
//const f = require(__dirname + "/../functions.js") - w folderze commands czy handlers
//const f = require(__dirname + "/functions.js") - w folderze src

//Używanie:
//f.funkcja


//-------------------------------------
//          Funkcje                   -
//-------------------------------------

//colorToHex
const colorToHex = function (color) {
    let hex = null
    if (color === "red") hex = "#ff0000"
    if (color === "lightblue") hex = "#00ff6f"
    if (color === "lightgreen") hex = "#00ff6f"
    if (color === "pink") hex = "#f9159e"
    if (color === "black") hex = "#000000"
    if (color === "orange") hex = "#f5720a"
    if (color === "yellow") hex = "#eff50a"
    if (color === "blue") hex = "#0a1bf5"
    if (color === "white") hex = "#ffffff"

    return hex
}

//randomNumber
const randomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min)) + min;
  }


//randomText
const randomText = function (textTable) {
    let text = textTable[Math.round(Math.random() * textTable.length)]
    return text
}

//wait
const wait = function (ms){
    let start = new Date().getTime();
    let end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

//customEmoji
const customEmoji = function (emoji) {
    let customEmoji = ""
    if (emoji === "bad") customEmoji = "<:nobutton:815279063794188329>"
    if (emoji === "love") customEmoji = "<:yesbutton:815279037387374612>"
    if (emoji === "tak") customEmoji = "<:tak:781074346469883905>"
    if (emoji === "help") customEmoji = "<:helpbutton:793191376199614524>"
    if (emoji === "settings") customEmoji = "<:setting:815279152114565121>"
    if (emoji === "web") customEmoji = "<:webpage:815279106756968448>"
    if (emoji === "question") customEmoji = "<:question:815279256425988128>"
    if (emoji === "blank") customEmoji = "<:przezroczyste:733948646881493065>"

    return customEmoji
}


//sToTime
const sToTime = function (timeInS) {
    let s = timeInS
    let m = 0
    let h = 0

    if (s >= 60) {
    
    m = Math.floor(s/60)
    s = s % 60

   
    }

    if (m >= 60) {
    h = Math.floor(m/60)
    m = m % 60
    }

    const time = `${h}:${m}:${s}`
    return time

}

//textPermissions
const textPermissions = function (permission) {
    const { Permissions: { FLAGS } } = require("discord.js")
    const flagsReverse = new Map()
    const flagsNames = Object.keys(FLAGS)
    const flagsNumbers = Object.values(FLAGS)
    flagsNames.forEach((f, i) => {
        flagsReverse.set(flagsNumbers[i], f)
    })
    const permissionsText = {
    CREATE_INSTANT_INVITE: "tworzenie zaproszenia",
    KICK_MEMBERS: "wyrzucanie członków",
    BAN_MEMBERS: "banowanie członków",
    ADMINISTRATOR: "administrator",
    MANAGE_CHANNELS: "zarządzanie kanałami",
    MANAGE_GUILD: "zarządzanie serwerem",
    ADD_REACTIONS: "dodawanie rekacji",
    VIEW_AUDIT_LOG: "wyświetlanie dziennika zdarzeń",
    PRIORITY_SPEAKER: "priorytetowy rozmówca",
    STREAM: "wideo",
    VIEW_CHANNEL: "wyświetlanie kanału",
    SEND_MESSAGES: "wysyłanie wiadomości",
    SEND_TTS_MESSAGES: "wysyłanie wiadomości tts",
    MANAGE_MESSAGES: "zarządzanie wiadomościami",
    EMBED_LINKS: "zamieszczanie linków",
    ATTACH_FILES: "załączanie plików",
    READ_MESSAGE_HISTORY: "czytanie historii czatu",
    MENTION_EVERYONE: "zamieszczanie wzmianki @everyone, @here oraz wszystkie role.",
    USE_EXTERNAL_EMOJIS: "używanie zewnętrznych emoji",
    VIEW_GUILD_INSIGHTS: "wyświetlanie statystyk serwera",
    CONNECT: "łączenie",
    SPEAK: "mówienie",
    MUTE_MEMBERS: "wyciszanie członków",
    DEAFEN_MEMBERS: "wyłączanie dźwięku członkom",
    MOVE_MEMBERS: "przenoszenie członków",
    USE_VAD: "używanie aktywności głosowej",
    CHANGE_NICKNAME: "zmiana pseudonimu",
    MANAGE_NICKNAMES: "zarządzanie pseudonimami",
    MANAGE_ROLES: "zarządzanie rolami",
    MANAGE_WEBHOOKS: "zarządzanie webhookami",
    MANAGE_EMOJIS: "zarządzanie emoji"
  }
  if (Array.isArray(permission)) {
      const permissions = []
      permission.forEach(e => permissions.push(permissionsText[flagsReverse.get(e)]))
      return betterjoin(permissions.map(p => "**" + p.toUpperCase() + "**"))
  }
  return "**" + permissionsText[flagsReverse.get(permission[0])].toUpperCase() + "**"
}

const userProgramPerms = function (min, author) {
    const { supporters, programers, testers } = require("./config/config.js")
    let userprogramperms = 0
    if (supporters.includes(author)) userprogramperms = 1
    if (testers.includes(author)) userprogramperms = 2
    if (programers.includes(author)) userprogramperms = 3
    let userprogrampermstext = "użytkownik"
    let mintext = "programista"
    if (min == 1) mintext = "supporter"
    if(min == 2) mintext = "tester"
    if(min == 3) mintext = "programista"
    if(userprogramperms == 1) userprogrampermstext = "supporter"
    if(userprogramperms == 2) userprogrampermstext = "tester"
    if(userprogramperms == 3) userprogrampermstext = "programista"

    return {
        text: `${customEmoji("bad")} Nie masz wystarczającego poziomu uprawnień develpoerów bota.\nWymagany: \`${min} (${mintext})\`\nTwój: \`${userprogramperms} (${userprogrampermstext})\``,
        userprogramperms: userprogramperms,
        userprogrampermstext,
    }
}



const betterjoin = function (table, symbol, lastsymbol) {
    if (!table) return
    if (!Array.isArray(table)) return
    if (!symbol || typeof(symbol) != "string") symbol = ", "
    if (!lastsymbol || typeof(lastsymbol) != "string") lastsymbol = " i "

    const tab1 = [...table].slice(0, -1).join(symbol)
    const tab2 = [...table].slice(-1).join("")
    let joinedtable = tab1 + lastsymbol + tab2
    if (!tab1) joinedtable = tab2

    return joinedtable
    
}

const numberEnd = function (number, text) {
    if (Number.isNaN(number)) return "Nieprawdiłowy numer."
    text = text.toString()
    let ending = ""
    if (number === 0) ending = "ów"
    if (number > 1 && number < 5) ending = "y"
    if (number > 4 && number < 22) ending = "ów"
    if (number.toString().length > 1) {
        let lastnumber = Number(number.toString().slice(-1, number.toString().length))
        if (number > 21) {
            if (lastnumber > 1 && lastnumber < 5) ending = "y"
            if (lastnumber > 4) ending = "ów"
            if (number.toString().length > 2) {
                lastnumber = Number(number.toString().slice(-2, number.toString().length))
                console.log(lastnumber)
                if (lastnumber === 0) ending = "ów"
                if (lastnumber > 1 && lastnumber < 5) ending = "y"
                if (lastnumber > 4 && lastnumber < 22) ending = "ów"

            }
        }
    }
    return number + " " + text + ending
    
}

const betterRound = function (equation) {
    Math.round(equation)
    return output;
}

const timeToMs = (time, validEndings=["m", "h", "d", "w", "mt"]) => {
    const description = {
        s: {
            one: "(sekunda)",
            multi: "sekund",
        },
        m: {
            one: "(minuta)",
            multi: "minut",
        },
        h: {
            one: "(godzina)",
            multi: "minut",
        },
        d: {
            one: "(dzień)",
            multi: "dni",
        },
        w: {
            one: "(tydzień)",
            multi: "tygodni",
        },
        mt: {
            one: "(miesiąc)",
            multi: "miesięcy",
        }
    }
    validEndings = ["s", "m", "h", "d", "w", "mt"].filter(e => validEndings.includes(e))
    if (!validEndings.some(e => time.endsWith(e))) return {
        status: "error",
        message: 'Nieprawidłowa jednostka czasu. Prawidłowe jednostki: ' + betterjoin(validEndings.map(e => "`" + e + "` " + description[e].one)) + "."
    }
    const ending = time.slice(-validEndings.find(e => time.endsWith(e)).length, time.length)
    const amount = Number(time.slice(0, -validEndings.find(e => time.endsWith(e)).length))
    if (amount < 1) return {
        status: "error",
        message: "Ilość czasu jest równa 0."
    }

    let calculatedAmount = 0

    if (ending === "s") calculatedAmount = amount * 1000
    if (ending === "m") calculatedAmount = amount * 1000 * 60
    if (ending === "h") calculatedAmount = amount * 1000 * 60 * 60
    if (ending === "d") calculatedAmount = amount * 1000 * 60 * 60 * 24
    if (ending === "w") calculatedAmount = amount * 1000 * 60 * 60 * 24 * 7
    if (ending === "mh") calculatedAmount = amount * 1000 * 60 * 60 * 24 * 7 * 30
    return {
        status: "success",
        amount: calculatedAmount,
        description: `${amount} ${description[ending].multi}`
    }
}

const moderationEmbed = (title, action, moderatorId, reason, time=":infinity:") => {
    const { MessageEmbed } = require("discord.js")
    const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(`**Akcja:** ${action} \n**Moderator:** <@${moderatorId}> \n**Powód:** ${reason} \n**Czas:** ${time}`)
    .setColor(colorToHex("red"))
    return embed
    }




//-------------------------------------
//          Eksportowanie             -
//-------------------------------------
module.exports = {
    colorToHex,
    randomNumber,
    randomText,
    customEmoji,
    sToTime,
    textPermissions,
    userProgramPerms,
    betterjoin,
    numberEnd,
    timeToMs,
    moderationEmbed,
    wait,
    betterRound,
}

