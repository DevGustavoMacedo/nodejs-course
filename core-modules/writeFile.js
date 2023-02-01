const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const urlInfo = require('url').parse(req.url, true)
  const name = urlInfo.query.name

  if (!name) {
    fs.readFile('writeFile.html', (err, data) => {
      res.writeHead(200, { 'Content-type': 'text/html' })
      res.write(data)
      return res.end()
    })
  } else {
    fs.writeFile('writeFile.txt', name, function (err, data) {
      res.writeHead(302, { Location: '/' })
    })

    return res.end()
  }
})

server.listen(3000, () => console.log('Server listening on port 3000'))
