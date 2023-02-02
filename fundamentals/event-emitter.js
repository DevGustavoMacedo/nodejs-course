const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('start', () => console.log('Meio'))

console.log('Inicio')

eventEmitter.emit('start')

console.log('Fim')
