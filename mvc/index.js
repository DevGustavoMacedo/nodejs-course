// imports
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const tasksRoutes = require('./routes/tasksRoutes')

// models

const Task = require('./models/Task')

// middlewares

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/tasks', tasksRoutes)

conn
  .sync()
  .then(() => app.listen(3000, () => console.log('Server listening...')))
  .catch((error) => console.log(error))