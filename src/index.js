const {Client, IntentsBitField, EmbedBuilder} = require("discord.js");
const mongoose = require('mongoose')
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
  intents : [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ Database Connected")
    
    eventHandler(client)
    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`🔴 Error occurred in index page : ${error}`);
  }
})()

