const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const app = express()

// middlewares

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// rotas

app.get('/', (req, res) => {
  const query = `SELECT * FROM books`

  conn.query(query, (err, data) => {
    if (err) {
      console.log(err)
    }
    const books = data

    return res.render('home', { books })
  })
})

app.get('/formBook', (req, res) => res.render('formBook'))

app.get('/book/:id', (req, res) => {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id', id]

  conn.query(query, data, (err, data) => {
    if (err) {
      console.log(err)
      return res.redirect('/')
    } else {
      const book = data[0]

      return res.render('book', { book })
    }
  })
})

app.post('/book/add', (req, res) => {
  const { title, pages } = req.body

  // sanitizar os dados pra evitar sql injection
  const query = `INSERT INTO books (??, ??) VALUES (?, ?)`
  const data = ['title', 'pages', title, pages]

  conn.query(query, data, (err) => {
    if (err) {
      console.log(err)
    }

    return res.redirect('/')
  })
})

app.get('/book/edit/:id', (req, res) => {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE ??=?`
  const data = ['id', id]

  conn.query(query, data, (err, data) => {
    if (err) {
      console.log(err)
      return res.redirect('/')
    } else {
      const book = data[0]

      const edit = true

      return res.render('formBook', { book, edit })
    }
  })
})

app.post('/book/edit/', (req, res) => {
  const { id, title, pages } = req.body

  const query = `UPDATE books SET ??=?, ??=? WHERE ??=?`
  const data = ['title', title, 'pages', pages, 'id', id]

  conn.query(query, data, (err) => {
    if (err) {
      console.log(err)
    }

    return res.redirect('/')
  })
})

app.post('/book/delete/:id', (req, res) => {
  const id = req.params.id

  const query = `DELETE FROM books WHERE ??=?`
  const data = ['id', id]

  conn.query(query, data, (err) => {
    if (err) {
      console.log(err)
    }

    return res.redirect('/')
  })
})

app.listen(3000, () => console.log('Server listening...'))
