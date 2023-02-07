const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')
// nem precisa chamar isso, só de ter aqui já cria a tabela
const Address = require('./models/Address')

const app = express()

// middlewares

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// rotas

app.get('/', async (req, res) => {
  const users = await User.findAll({ raw: true })
  // o raw é pra ver só os dados dos registros, senão vem vários dados amais

  res.render('home', { users })
})

app.post('/users/delete', async (req, res) => {
  const reqId = req.body.id

  await User.destroy({ where: { id: reqId } })

  res.redirect('/')
})

app.get('/users/create', (req, res) => res.render('addUser'))

app.post('/users/create', async (req, res) => {
  let { name, occupation, newsletter } = req.body

  newsletter === 'on' ? (newsletter = true) : (newsletter = false)

  await User.create({ name, occupation, newsletter })

  res.redirect('/')
})

app.post('/users/update', async (req, res) => {
  let { id, name, occupation, newsletter } = req.body

  newsletter === 'on' ? (newsletter = true) : (newsletter = false)

  await User.update({ name, occupation, newsletter }, { where: { id: id } })

  res.redirect('/')
})

app.get('/users/:id', async (req, res) => {
  const reqId = req.params.id

  const user = await User.findOne({ include: Address, where: { id: reqId } })
  // o include traz os endereços do usuário

  if (user) {
    res.render('userView', { user: user.get({ plain: true }) })
  } else {
    res.redirect('/')
  }
})

app.post('/address/create', async (req, res) => {
  let { userId, street, number, city } = req.body

  await Address.create({ userId, street, number, city  })

  res.redirect('/')
})

app.post('/address/delete', async (req, res) => {
  const id = req.body.id

  console.log('AQUIIIIIIIIIIIIIIIIII ' + id)

  await Address.destroy({ where: { id: id } })

  res.redirect('/')
})

conn
  .sync()
  // .sync({ force: true })     
  // Isso recria as tabelas vazias. Pode ser útil quando adicionar/remover um campo
  .then(() => app.listen(3000, () => console.log('Server listening...')))
  .catch((error) => console.log(error))
