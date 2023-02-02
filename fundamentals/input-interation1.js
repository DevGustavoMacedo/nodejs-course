const chalk = require('chalk')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

readline.question('Sua namorada é bonita? [S/N] ', (answer) => {
  if (answer.toUpperCase() === 'S') {
    console.log(chalk.redBright.bold('Parabéns, posso beijar sua namorada?'))
    readline.close()
  } else {
    console.log(chalk.greenBright.bgGray('Parabéns, pode beijar sua namorada!'))
    readline.close()
  }
})