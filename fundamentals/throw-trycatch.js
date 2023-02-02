const num = '10'

try {
  num = 10 // dá erro por ser const
} catch (error) {
  console.log(error)
}

if (typeof num === 'string') {
  throw new Error('Tipo inválido')
}
