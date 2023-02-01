const fs = require('fs')

fs.unlink('appendFile.txt', (err) => err ? console.log(err) : console.log('File removed'))
