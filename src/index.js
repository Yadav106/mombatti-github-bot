const {Client, IntentsBitField, EmbedBuilder} = require("discord.js");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
  intents : [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

eventHandler(client)

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  switch(interaction.commandName) {
    case "hey":
      interaction.reply("Hey there!")
      break
    case "ping":
      interaction.reply("Pong!")
      break
    case "add":
      const num1 = interaction.options.get("first");
      const num2 = interaction.options.get("second");
      interaction.reply(`${num1.value} + ${num2.value} = ${num1.value+num2.value}`);
      break
    case "embed":
      const embed = new EmbedBuilder()
        .setTitle("Embed Title")
        .setDescription("This is an embed")
        .setColor(0x12a2e5)
        .setFields(
          {
            "name": "Random Field",
            "value": "Random Field Value",
            "inline": true
          },
          {
            "name": "Second Field",
            "value": "Second Field Value",
            "inline": true
          }
        )
      interaction.reply({embeds: [embed]})
      break
  }
})

client.login(process.env.TOKEN);

