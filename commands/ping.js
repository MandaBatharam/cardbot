exports.run = (client, message, params) => {
  message.channel.send(`Pong xD! \`${client.ping} ms\``)
};
exports.conf = {
  aliases: [],
};
exports.help = {
  name: 'ping',
  description: 'its show your ping',
  usage: 'to see your ping'
};
