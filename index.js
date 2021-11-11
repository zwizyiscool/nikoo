const { Client, Collection } = require("discord.js");
const { dateCheck_Day, dateCheck_Month, today, realMonth, GuildID} = require("./SlashCommands/info/date")
const db = require('./schema/date-schema')

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"] 
});
module.exports = client;


client.slashCommands = new Collection();


require("./handler")(client);
require('dotenv').config()
client.login(process.env.token)
