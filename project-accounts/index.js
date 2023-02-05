// external modules
const inquirer = require('inquirer')

// core modules
const fs = require('fs')

// internal modules
const { getAccountName, verifyAccount, getAccountData, message } = require('./helpers')

const createAccount = async () => {
  const accountName = await getAccountName()

  if (!fs.existsSync('accounts')) {
    fs.mkdirSync('accounts')
  }

  if (fs.existsSync(`accounts/${accountName}.json`)) {
    message.red('This account name already exists')

    return createAccount()
  }

  if (!accountName) {
    message.red('An error occurred, try again later')
    
    return createAccount()
  }

  fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (err) => message.red(err))

  message.green('Account created successfully')

  operations()
}

const depositMoney = async () => {
  const accountName = await getAccountName()

  if (!verifyAccount(accountName)) {
    return depositMoney()
  }

  inquirer
    .prompt([
      {
        name: 'amount',
        message: 'How much do you want to deposit?',
      },
    ])
    .then((answer) => {
      const amount = answer['amount']

      addAmount(accountName, amount)
    })
}

const addAmount = (accountName, amount) => {
  const accountData = getAccountData(accountName)

  if (!amount) {
    message.red('An error occurred, try again later')

    return depositMoney()
  }

  accountData.balance += parseInt(amount)

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err) =>
    message.red(err)
  )

  message.green(`R$${amount} has been deposited into your account`)

  return operations()
}

const checkBalance = async () => {
  const accountName = await getAccountName()

  if (!verifyAccount(accountName)) {
    return checkBalance()
  }

  const accountData = getAccountData(accountName)

  message.blue('Your account balance is R$' + accountData.balance)

  return operations()
}

const removeAmount = (accountName, amount) => {
  const accountData = getAccountData(accountName)

  if (!amount) {
    message.red('An error occurred, try again later')

    return withdrawMoney()
  }

  if (accountData.balance < amount) {
    message.red('Cannot withdraw a higher value than your balance')

    return withdrawMoney()
  }

  accountData.balance -= parseInt(amount)

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err) =>
    message.red(err)
  )

  message.green(`R$${amount} has been withdrawn from your account`)

  operations()
}

const withdrawMoney = async () => {
  const accountName = await getAccountName()
  
  if (!verifyAccount(accountName)) {
    return withdrawMoney()
  }

  inquirer
    .prompt([
      {
        name: 'amount',
        message: 'How much do you want to withdraw?',
      },
    ])
    .then((answer) => {
      const amount = answer['amount']

      removeAmount(accountName, amount)
    })
    .catch((err) => message.red(err))
}

const operations = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an option',
        choices: ['Create account', 'Deposit money', 'Consult balance', 'Withdraw money', 'Exit'],
      },
    ])
    .then((answer) => {
      switch (answer['action']) {
        case 'Create account':
          message.blue('Congratulations! Set your account options')

          createAccount()
          break

        case 'Deposit money':
          depositMoney()

          break

        case 'Consult balance':
          checkBalance()
          break

        case 'Withdraw money':
          withdrawMoney()
          break

        case 'Exit':
          message.blue('Thanks for using our app :D')
          process.exit()

        default:
          break
      }
    })
    .catch((err) => console.log(err))
}

operations()
