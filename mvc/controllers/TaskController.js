const Task = require('../models/Task')

const showAllTasks = async (req, res) => {
  const tasks = await Task.findAll({ raw: true })

  res.render('tasks/all', { tasks })
}

const showOneTask = async (req, res) => {
  const id = req.params.id

  const tasks = await Task.findAll({ raw: true, where: { id: id } })

  res.render('tasks/one', { tasks })
}

const createTask = (req, res) => {
  res.render('tasks/create')
}

const createTaskSave = async (req, res) => {
  const { title, description } = req.body
  const done = false

  await Task.create({ title, description, done })

  res.redirect('/tasks')
}

const editTask = async (req, res) => {
  const id = req.params.id

  const task = await Task.findOne({ raw: true, where: { id: id } })

  res.render('tasks/edit', { task })
}

const editTaskSave = async (req, res) => {
  let { id, title, description, done } = req.body
  
  done === 'on' ? (done = true) : (done = false)
  
  await Task.update({ title, description, done }, { where: { id: id } })

  res.redirect('/tasks')
}

const deleteTask = async (req, res) => {
  const id = req.body.id

  console.log(id)

  if (id) {
    await Task.destroy({ where: { id: id } })
  }

  res.redirect('/tasks')
}

module.exports = {
  showAllTasks,
  showOneTask,
  createTask,
  createTaskSave,
  editTask,
  editTaskSave,
  deleteTask,
}
