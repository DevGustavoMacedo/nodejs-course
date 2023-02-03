const express = require('express')
const exphbs = require('express-handlebars')

const app = express()



// configurando diretorio dos partials
const hbs = exphbs.create({
  partialsDir: 'views/partials'
})



// configurando a view
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')





// rotas

app.get('/home', (req, res) => {
  const userData = {
    name: 'Michael',
    age: 42,
    nick: 'Mike'
  }

  const auth = userData.name === 'Michael'

  return res.render('home', { userData, auth })

})

app.get('/about', (req, res) => {
  const users = [
    {
      name: 'Fulano'
    },
    {
      name: 'Ciclano'
    },
    {
      name: 'Beltrano'
    }
  ]

  return res.render('about', { users })
})

app.listen(3000, () => console.log('Server listening'))