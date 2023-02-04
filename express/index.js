const express = require('express')

const app = express()

const path = require('path')

const basePath = path.join(__dirname, 'templates')

const authAccess = (req, res, next) => {
  req.authStatus = true

  req.authStatus ? next() : res.json({msg: 'Access denied'})
}

// app.use(authAccess)


// Middlewares pra ler o body e transformar em json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// arquivos estaticos
app.use(express.static('public'))

const products = require('./routes')

app.use('/products', products)

app.get('/', (req, res) => {
  res.sendFile(basePath + '/index.html')
})

// middleware 404 page
app.use((req, res, next) => res.status(404).send('404 - Page not found'))

app.listen(3000, () => console.log('Server listening on port 3000'))