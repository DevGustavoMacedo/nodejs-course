const fs = require('fs')

if(fs.existsSync('test/')) {
  console.log('Folder already exist')
} else {
  console.log('Folder doesnt exist')
  fs.mkdirSync('test')
}