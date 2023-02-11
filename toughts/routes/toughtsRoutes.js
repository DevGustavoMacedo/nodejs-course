const express = require('express')
const router = express.Router()

const {
  showToughts,
  showDashboard,
  createToughts,
  showForm,
  deleteToughts,
  updateToughts,
} = require('../controllers/ToughtsController')

const checkAuth = require('../helpers/checkAuth')

router.get('/toughts', showToughts)
router.get('/dashboard/add', checkAuth, showForm)
router.post('/dashboard/add', checkAuth, createToughts)
router.get('/dashboard/edit/:id', checkAuth, showForm)
router.post('/dashboard/edit', checkAuth, updateToughts)
router.post('/dashboard/delete', checkAuth, deleteToughts)
router.get('/dashboard', checkAuth, showDashboard)

module.exports = router
