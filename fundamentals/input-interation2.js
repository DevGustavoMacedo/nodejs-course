const inquirer = require('inquirer')

inquirer.prompt([
  {
    name: 'p1',
    message: 'First number: '
  },
  {
    name: 'p2',
    message: 'Second number: '
  }
]).then(answers => {
  const grade = (parseInt(answers.p1) + parseInt(answers.p2))/2 
  console.log(grade)
}).catch(error => console.log(error))
