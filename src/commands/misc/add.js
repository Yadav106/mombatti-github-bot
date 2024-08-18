const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
  name: "add",
  description: "Adds two numbers",
  // devOnly: Boolean,
  // testOnly: Boolean,
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
        {
          'name': 'four',
          'value': 4
        }
      ]
    },
    {
      name: 'second',
      description: "The second number",
      type: ApplicationCommandOptionType.Number,
      required: true
    },
  ],
  
  callback: (client, interaction) => {
    const num1 = interaction.options.get("first");
    const num2 = interaction.options.get("second");
    interaction.reply(`${num1.value} + ${num2.value} = ${num1.value+num2.value}`);
  }
}
