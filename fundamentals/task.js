const chalk = require('chalk')
const inquirer = require('inquirer')

inquirer
  .prompt([
    {
      name: 'name',
      message: 'Name: ',
    },
    {
      name: 'age',
      message: 'Age: ',
    },
  ])
  .then((answers) => {
    if (!answers.name || !answers.age) {
      throw new Error('Fill the questions!')
    }

    console.log(chalk.black.bgYellow(`Hello, ${answers.name}! You are ${answers.age} years old`))
  })
  .catch((error) => console.log(error))
