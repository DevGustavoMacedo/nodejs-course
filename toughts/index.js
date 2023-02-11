// imports
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

const conn = require('./db/conn')

// models
const User = require('./models/User')
const Tought = require('./models/Tought')

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// receber resposta do body 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// mensagens do sistema
app.use(flash())

// public path
app.use(express.static('public'))

// onde o express vai salvar as sessions
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      httpOnly: true,
    },
  })
)

// set session to response
app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session
  }

  next()
})

// rotas (colocar isso sempre no final)
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

app.get('/', (req, res) => res.render('home'))
app.use('/', toughtsRoutes, authRoutes)

conn
  .sync()
  .then(() => app.listen(3000, () => console.log('Server listening...')))
  .catch((error) => console.log(error))
