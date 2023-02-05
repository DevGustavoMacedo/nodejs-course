const inquirer = require('inquirer')
const fs = require('fs')
const chalk = require('chalk')

const message = {
  green: (msg) => console.log(chalk.bgGreen.black(msg)),
  red: (msg) => console.log(chalk.bgRed.black(msg)),
  blue: (msg) => console.log(chalk.bgCyan.black(msg))  
}

const getAccountName = async () => {
  let accountName = ''

  await inquirer
    .prompt([
      {
        name: 'accountName',
        message: "What's your account name?",
      },
    ])
    .then((answer) => {
      accountName = answer['accountName'].toLowerCase()
    })
    .catch((err) => message.red(err))

  return accountName
}

const verifyAccount = (accountName) => {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    message.red('This account name don\'t exists')
    return false
  }

  return true
}

const getAccountData = (accountName) => {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r',
  })

  return JSON.parse(accountJSON)
}

module.exports = {
  verifyAccount,
  getAccountName,
  getAccountData,
  message
}