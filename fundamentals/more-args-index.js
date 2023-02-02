const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

const { minus } = require('./more-args-minus')

const n1 = parseInt(args['n1'])
const n2 = parseInt(args['n2'])

console.log(minus(n1, n2))

/* 
Terminal:
--n1=3 --n2=4
*/