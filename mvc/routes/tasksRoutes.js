const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TaskController')

router.get('/', TaskController.showAllTasks)
router.post('/edit', TaskController.editTaskSave)
router.get('/edit/:id', TaskController.editTask)
router.post('/delete', TaskController.deleteTask)
router.get('/add', TaskController.createTask)
router.post('/add', TaskController.createTaskSave)
router.get('/:id', TaskController.showOneTask)

module.exports = router