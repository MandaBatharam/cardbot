const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);



const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

  function play(connection, message) {
    var server = servers[message.guild.id];
    var servers = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
  }


client.on('message', message => {
  var servers = {};
    if (message.content.startsWith(settings.prefix + 'play')) {
        var args = message.content.substring(settings.prefix.length).split(' ');
        if(!args[1]) {
            message.channel.send('Please Provide a link');
            return;
        }
        if (!message.member.voiceChannel) {
          var servers = servers[message.guild.id];
            message.channel.send('Please move over to a voice channel');
            return;
        }
        if (!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        };

        var servers = servers[message.guild.id];

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            play(connection, message);

        });
    };
    if (message.content.startsWith(settings.prefix + 'skip')) {
        var servers = servers[message.guild.id];
        if(server.dispatcher) server.dispatcher.end();
    }

    if (message.content.startsWith(settings.prefix + 'stop')) {
        var servers = servers[message.guild.id];

        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    }
})

client.on('message', message => {
  const responses = [
    "OI OI OI Don't say that word","=-=","Swearing is not allllowed!"
  ]
  const swearWords = ["mother fucker","Nigger","fuck","fuck you","f#@k","punda","sunni","Fuck","FUCK","fUcK"];
if( swearWords.some(word => message.content.includes(word)) ) {
  message.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
}
})


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(settings.token);
