const f = require(__dirname + "/../functions.js")

module.exports = {
    name:"emoji",
    description:"Zamienia podany tekst na emoji.",
    category: "fun",
    args: 1,
    ussage: "<tekst>",
    aliases: ["emotkuj"],
    run(msg, args) {
        const text = args.join(" ").toLowerCase().split("")
        let emoji = ""
        text.forEach((letter) => {
          const length = emoji.length
          if (letter === "\n") emoji += "\n"
          if (letter === " ") emoji += "         "
          if (letter === "#") emoji += ":hash: "
          if (letter === "*") emoji += ":asterisk: "
          if (letter === ">") emoji += ":arrow_forward: "
          if (letter === "<") emoji += ":arrow_backward: "
          if (letter === "?") emoji += ":question: "
          if (letter === "!") emoji += ":exclamation: "
          if (letter === "1") emoji += ":one: "
          if (letter === "2") emoji += ":two: "
          if (letter === "3") emoji += ":three: "
          if (letter === "4") emoji += ":four: "
          if (letter === "5") emoji += ":five: "
          if (letter === "6") emoji += ":six: "
          if (letter === "7") emoji += ":seven: "
          if (letter === "8") emoji += ":eight: "
          if (letter === "9") emoji += ":nine: "
          if (letter === "a") emoji += ":regional_indicator_a: "
          if (letter === "ą") emoji += ":regional_indicator_a: "
          if (letter === "b") emoji += ":regional_indicator_b: "
          if (letter === "c") emoji += ":regional_indicator_c: "
          if (letter === "ć") emoji += ":regional_indicator_c: "
          if (letter === "d") emoji += ":regional_indicator_d: "
          if (letter === "e") emoji += ":regional_indicator_e: "
          if (letter === "ę") emoji += ":regional_indicator_e: "
          if (letter === "f") emoji += ":regional_indicator_f: "
          if (letter === "g") emoji += ":regional_indicator_g: "
          if (letter === "h") emoji += ":regional_indicator_h: "
          if (letter === "i") emoji += ":regional_indicator_i: "
          if (letter === "j") emoji += ":regional_indicator_j: "
          if (letter === "k") emoji += ":regional_indicator_k: "
          if (letter === "l") emoji += ":regional_indicator_l: "
          if (letter === "ł") emoji += ":regional_indicator_l: "
          if (letter === "m") emoji += ":regional_indicator_m: "
          if (letter === "n") emoji += ":regional_indicator_n: "
          if (letter === "ń") emoji += ":regional_indicator_n: "
          if (letter === "o") emoji += ":regional_indicator_o: "
          if (letter === "ó") emoji += ":regional_indicator_o: "
          if (letter === "p") emoji += ":regional_indicator_p: "
          if (letter === "q") emoji += ":regional_indicator_q: "
          if (letter === "r") emoji += ":regional_indicator_r: "
          if (letter === "s") emoji += ":regional_indicator_s: "
          if (letter === "t") emoji += ":regional_indicator_t: "
          if (letter === "u") emoji += ":regional_indicator_u: "
          if (letter === "v") emoji += ":regional_indicator_v: "
          if (letter === "w") emoji += ":regional_indicator_w: "
          if (letter === "x") emoji += ":regional_indicator_x: "
          if (letter === "y") emoji += ":regional_indicator_y: "
          if (letter === "z") emoji += ":regional_indicator_z: "
          if (letter === "ź") emoji += ":regional_indicator_z: "
          if (letter === "ż") emoji += ":regional_indicator_z: "
          if (letter === "∞") emoji += ":infinity: "
          if (length === emoji.length) emoji += letter
        })
        msg.channel.send(emoji)
  }
    

    
}