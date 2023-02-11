const User = require('../models/User')
const bcrypt = require('bcryptjs')

const loginForm = (req, res) => res.render('auth/login')

const logout = (req, res) => {
  req.session.destroy()

  res.redirect('/')
}

const loginSave = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ raw: true, where: { email: email } })

  // user match
  if (!user) {
    req.flash('message', 'Email não encontrado')
    return res.render('auth/login')
  }

  // password match
  const passwordMath = bcrypt.compareSync(password, user.password)

  if (!passwordMath) {
    req.flash('message', 'Senha inválida')
    return res.render('auth/login')
  }
  
  // init session
  req.session.userId = user.id
  
  req.flash('message', 'Login realizado com sucesso')

  req.session.save(() => res.redirect('/'))
}

const registerForm = (req, res) => res.render('auth/register')

const registerSave = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  // password match validation
  if (password !== confirmPassword) {
    req.flash('message', 'As senhas não são iguais')
    return res.render('auth/register')
  }

  // check if user exists
  const hasUser = await User.findOne({ raw: true, where: { email: email } })

  if (hasUser) {
    req.flash('message', 'O email já está em uso')
    return res.render('auth/register')
  }

  // create password
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const newUser = {
    name,
    email,
    password: hashedPassword,
  }

  try {
    const createdUser = await User.create(newUser)

    // init session
    req.session.userId = createdUser.id

    req.flash('message', 'Cadastro realizado com sucesso')

    req.session.save(() => res.redirect('/'))
  } catch (error) {
    req.flash('message', 'Ocorreu algum problema no sistema')

    res.redirect('/register')

    console.log(error)
  }
}

module.exports = {
  loginForm,
  loginSave,
  logout,
  registerForm,
  registerSave,
}
