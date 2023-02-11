const express = require('express')
const { loginForm, loginSave, registerForm, registerSave, logout } = require('../controllers/AuthController')

const router = express.Router()

router.get('/login', loginForm)
router.post('/login', loginSave)
router.get('/logout', logout)
router.get('/register', registerForm)
router.post('/register', registerSave)

module.exports = router