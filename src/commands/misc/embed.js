const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "embed",
  description: "Replies with an embed",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  
  callback: (client, interaction) => {
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
  }
}
