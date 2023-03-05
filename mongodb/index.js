const express = require('express')
const app = express()

const conn = require('./db')

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const productsRoutes = require('./routes/productsRoutes')
app.use('/products', productsRoutes)

app.listen(3000, () => console.log('Server started...'))