require("dotenv").config()
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js")

const commands = [
  {
    name: 'hey',
    description: 'Replies with hey!'
  },
  {
    name: 'ping',
    description: 'Replies pong!'
  },
  {
    name: 'add',
    description: "Adds two numbers",
    options: [
      {
        name: 'first',
        description: "The first number",
        type: ApplicationCommandOptionType.Number,
        required: true,
        choices: [
          {
            'name': 'one',
            'value': 1
          },
          {
            'name': 'two',
            'value': 2
          },
          {
            'name': 'three',
            'value': 3
          },
        ]
      },
      {
        name: 'second',
        description: "The second number",
        type: ApplicationCommandOptionType.Number,
        required: true
      },
    ]
  },
  {
    name: "embed",
    description: "sends an embed"
  }
]

const rest = new REST({ version: "10" })
rest.setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🟡 Registering slash commands")

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands
      }
    )

    console.log("🟢 Slash commands registered successfully!")
  } catch (error) {
    console.log(`🔴 There was an error : ${error}`)
  }
})();
