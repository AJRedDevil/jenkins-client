const chalk = require('chalk');

const printInfo = msg => console.log(chalk.yellow(msg));
const printSuccess = msg => console.log(chalk.green(msg));
const printError = msg => console.log(chalk.red(msg));

module.exports = {
  printInfo,
  printSuccess,
  printError,
};
