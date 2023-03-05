const express = require('express')

const router = express.Router()

const {
  createProduct,
  showOneProduct,
  showAllProducts,
  deleteProduct,
  updateProduct,
} = require('../controllers/ProductController')

router.get('/all', showAllProducts)
router.get('/one/:id', showOneProduct)
router.post('/create', createProduct)
router.post('/delete/:id', deleteProduct)
router.post('/update/:id', updateProduct)

module.exports = router
