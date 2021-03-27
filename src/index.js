const { Client, Intents } = require("discord.js");
const { Database } = require("quickmongo");
const intents = new Intents([
    Intents.NON_PRIVILEGED, // include all non-privileged intents, would be better to specify which ones you actually need
    "GUILD_MEMBERS",
    "GUILD_PRESENCES", // lets you request guild members (i.e. fixes the issue)
]);
global.client = new Client();
client.config = require("./config/config.js")
global.f = require("./functions.js")

client.db = new Database(process.env.mongoUrl)



const commandHandler = require("./handlers/command.handler")
const eventHandler = require("./handlers/event.handler")


// Wczytuje commandHandler
commandHandler(client)
//Wczytuje eventHandler
eventHandler(client)


client.login(process.env.token)


process.on('uncaughtException', err =>  console.log('Caught exception:' + err));
