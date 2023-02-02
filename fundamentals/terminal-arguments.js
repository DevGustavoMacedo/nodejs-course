// no terminal: firstName=Gustavo age=20

const firstName = process.argv.slice(2)[0].split('=')[1]

const age = process.argv.slice(3)[0].split('=')[1]

console.log(`${firstName} tem ${age} anos`)