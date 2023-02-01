const path = require('path')

const customPath = 'repos/nodejs/index.js'

console.log(path.dirname(customPath))
console.log(path.basename(customPath))
console.log(path.extname(customPath))
console.log(path.resolve('routes.js'))

const folder = 'reports'
const fileName = 'test.txt'

const finalPath = path.join(folder, fileName)

console.log(finalPath)
