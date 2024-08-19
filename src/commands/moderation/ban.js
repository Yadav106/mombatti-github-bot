const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js")

module.exports = {
  name: "ban",
  description: "bans a member!!!",
  // devOnly: Boolean,
  // testOnly: Boolean,
  deleted: true,
  options: [
    {
      name: "target-user",
      description: "the user to ban",
      required: true,
      type: ApplicationCommandOptionType.Mentionable
    },
    {
      name: "reason",
      description: "the reason to ban",
      type: ApplicationCommandOptionType.String
    }
  ],

  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
  
  callback: (client, interaction) => {
    interaction.reply('ban..')
  }
}
