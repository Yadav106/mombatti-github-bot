const { ApplicationCommandOptionType, Client, Interaction, AttachmentBuilder } = require('discord.js');
const canvacord = require('canvacord')
const { Font } = require('canvacord');
const Level = require('../../models/Level');
const calculateLevelXp = require('../../utils/calculateLevelXp');

Font.loadDefault();

/** 
 * @param {Client} client
 * @param {Interaction} interaction
 */

module.exports = {
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply("You can only run this command in a server");
    }

    await interaction.deferReply();

    const mentionedUserId = interaction.options.get('target-user')?.value;
    const targetUserId = mentionedUserId || interaction.member.id;
    const targetUserObj = await interaction.guild.members.fetch(targetUserId);

    const fetchedLevel = await Level.findOne({
      userId: targetUserId,
      guildId: interaction.guild.id
    });

    if (!fetchedLevel) {
      interaction.editReply(
        mentionedUserId
        ? 
        `${targetUserObj.user.tag} doesn't have any levels yet. Try again when they chat a little more.`
        :
        `You don't have any levels yet. Chat a little more and try again`
      )
      return;
    }

    let allLevels = await Level.find({
      guildId: interaction.guild.id
    }).select('-_id userId level xp');

    allLevels.sort((a, b) => {
      if (a.level === b.level) {
        return b.xp - a.xp;
      } else {
        return b.level - a.level;
      }
    });

    let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;

    const rank = new canvacord.RankCardBuilder()
      .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
      .setRank(currentRank)
      .setLevel(fetchedLevel.level)
      .setCurrentXP(fetchedLevel.xp)
      .setRequiredXP(calculateLevelXp(fetchedLevel.level))
      .setUsername(targetUserObj.user.username)
      .setTextStyles({
        level: "LEVEL:", 
        xp: "EXP:", 
        rank: "RANK:",
      });

    const image = await rank.build({ format: 'png' });
    const attachment = new AttachmentBuilder(image);
    interaction.editReply({ files: [attachment] });
  },

  name: 'level',
  description: "Shows your/someone's level.",
  options: [
    {
      name: 'target-user',
      description: 'the user whose level you want to see',
      type: ApplicationCommandOptionType.Mentionable
    }
  ]
}
