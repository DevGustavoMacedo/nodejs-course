const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  fs.readFile('fs.html', (err, data) => {
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.write(data)
    return res.end()
  })  
})

server.listen(3000, () => console.log('Server listening on port 3000'))