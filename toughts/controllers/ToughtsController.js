const { Op } = require('sequelize')

const Tought = require('../models/Tought')
const User = require('../models/User')

const showToughts = async (req, res) => {
  const search = req.query.search ? req.query.search : ''

  const order = req.query.order ? req.query.order : 'DESC'

  const toughts = await Tought.findAll({
    include: User,
    raw: true,
    nest: true,
    where: { title: { [Op.like]: `%${search}%` } },
    order: [['createdAt', order]],
  })

  const toughtsQty = toughts.length
  
  res.render('toughts/home', { toughts, search, toughtsQty })
}

const showDashboard = async (req, res) => {
  const userId = req.session.userId

  // check if user exists
  const user = await User.findOne({ where: { id: userId }, include: Tought, plain: true })

  /*
    o raw simplesmente joga os dados em um array, mas quando temos dados relacionados, ele acaba atrapalhando pq vira tudo uma coisa só. Ai precisamos usar o plain, pq ele entrega como um objeto. 
  */

  if (!user) {
    res.redirect('/login')
  }

  const toughts = user.toughts.map((item) => item.dataValues)

  res.render('toughts/dashboard', { toughts })
}

const showForm = async (req, res) => {
  const userId = req.session.userId
  const toughtId = req.params.id

  if (!toughtId) {
    return res.render('toughts/form')
  }

  const tought = await Tought.findOne({ raw: true, where: { id: toughtId, userId: userId } })

  if (!tought) {
    req.flash('message', 'Pensamento não encontrado!')
    return res.redirect('/dashboard')
  }

  res.render('toughts/form', { tought })
}

const createToughts = async (req, res) => {
  if (req.body.title.length < 5) {
    req.flash('message', 'Muito pequeno')
    return res.render('toughts/form')
  }

  const tought = {
    title: req.body.title,
    userId: req.session.userId,
  }

  try {
    await Tought.create(tought)

    req.flash('message', 'Pensamento criado!')

    req.session.save(() => res.redirect('/dashboard'))
  } catch (error) {
    console.log(error)

    res.render('toughts/form')
  }
}

const updateToughts = async (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const userId = req.session.userId

  try {
    await Tought.update({ title }, { where: { userId: userId, id: id } })

    req.flash('message', 'Pensamento editado!')

    req.session.save(() => res.redirect('/dashboard'))
  } catch (error) {
    console.log(error)

    res.redirect('/dashboard')
  }
}

const deleteToughts = async (req, res) => {
  const toughtId = req.body.id

  const userId = req.session.userId

  const tought = await Tought.findOne({ where: { id: toughtId, userId: userId } })

  if (!tought) {
    req.flash('message', 'Pensamento não encontrado!')
    return res.redirect('/dashboard')
  }

  try {
    await Tought.destroy({ where: { id: toughtId, userId: userId } })

    req.flash('message', 'Pensamento deletado!')

    req.session.save(() => res.redirect('/dashboard'))
  } catch (error) {
    console.log(error)
    req.flash('message', 'Erro no sistema')

    res.redirect('/dashboard')
  }
}

module.exports = {
  showToughts,
  showDashboard,
  showForm,
  createToughts,
  deleteToughts,
  updateToughts,
}
