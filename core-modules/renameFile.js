const fs = require('fs')

fs.rename('aaa.txt', 'test.txt', (err) => err ? console.log(err) : console.log('File renamed'))