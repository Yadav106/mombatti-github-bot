const { testServer } = require("../../../config.json");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");
const areCommandsDifferent = require("../../utils/areCommandsDifferent")

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, testServer);

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      )

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id)
          console.log(`🗑️ Deleted command : ${name}.`)
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options
          });

          console.log(`🔄 Edited command : ${name}`)
        }
      } else {
        if (localCommand.deleted) {
          console.log(`⏭️  Skipping registering of command ${name} as it is set to deleted`);
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options
        })

        console.log(`👍 Command registered ${name}.`)
      }
    }

  } catch (error) {
    console.log(`🔴 Error occurred while registering commands : ${error}`);
  }
}
