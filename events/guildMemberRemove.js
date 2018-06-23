const Discord = require('discord.js')
module.exports = member => {
  let guild = member.guild;
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .setTitle(`Please say goodbye to ${member.user.username} we will miss you!`)
  guild.defaultChannel.send({embed});
};
