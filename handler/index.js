const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");

const globPromise = promisify(glob);

module.exports = async (client) => {

    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));


    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
       // await client.guilds.cache
            //.get("763793803102126080")
            //.commands.set(arrayOfSlashCommands);

        await client.application.commands.set(arrayOfSlashCommands);
    });

    require('dotenv').config()
    mongoose.connect(process.env.mongooseConnectionString).then(() => console.log('✅ Database booted! \n  ______________________\n'));
};
