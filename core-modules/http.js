const http = require('http')

const server = http.createServer((req, res) => {
  
  res.statusCode = 200
  res.setHeader('Content-type', 'text/html; charset=utf-8')
  
  // res.write('Helloooooo')   // assim ele escreve texto puro
  res.end('<h1>Este é meu 1º server!</h1>')
})

server.listen(3000, () => console.log('Server listening on port 3000'))