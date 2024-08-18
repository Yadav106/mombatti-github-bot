module.exports = {
  name: "ping",
  description: "Replies with Pong!",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  
  callback: (client, interaction) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`)
  }
}
