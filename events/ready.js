const chalk = require('chalk');
module.exports = client => {
	client.user.setGame(`Fun with ${client.users.size} Players `,'https://www.twitch.tv/twitch');
	console.log(chalk.bgBlue('I\'m Online\nI\'m Online'));
	console.log(chalk.bgGreen("Cubie Bot"));
	console.log(chalk.bgRed("Version:-------------------------- 0.0.1"));
}
