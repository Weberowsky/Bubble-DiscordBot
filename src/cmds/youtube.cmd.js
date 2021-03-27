const { Util, MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require("yt-search")
var opusscript = require("opusscript");

module.exports = {
    name: "play",
    description: "Odtwarza utwór z YouTube",
    category: "music",
    aliases: ["p"],
    args: 1,
    ussage: "<nazwa utworu>",

    async run(message, args) {
        const Discord = require("discord.js");
const client = new Discord.Client();
const settings = {
    prefix: '!',
    token: 'YourBotTokenHere'
};

const { Player } = require("discord-music-player");
const player = new Player(client, {
	leaveOnEmpty: true, // This options are optional.
});
if (!message.member.voice.channel) {
    return message.channel.send(`Dołącz do kanału głosowego, aby odwtorzyć muzykę.`)
}

// You can define the Player as *client.player* to easly access it.
client.player = player;
if (client.player.isPlaying(message.guild.id)) {
    let song = await client.player.addToQueue(message.guild.id, args.join(' '));
    song = song.song;
    message.channel.send(`Utwór \`${song.name}\` został dodany do kolejki!`);
} else {
    let song = await client.player.play(message.member.voice.channel, args.join(' '), {
    
    });
    song = song.song;
    message.channel.send(`Odwtarzanie \`${song.name}\`.`);
}

    }
    }
