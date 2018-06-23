const Discord = require('discord.js')
module.exports = member => {
  let guild = member.guild;
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`welcome ${member.user.username} to the ${guild.name} server! Hope you have a great day`)
  guild.defaultChannel.send({embed});
};
