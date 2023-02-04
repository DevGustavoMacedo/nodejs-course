const express = require('express')
const router = express.Router()

const path = require('path')

const basePath = path.join(__dirname, 'templates')

const products = [
  {
    id: '1',
    name: 'a'
  },
  {
    id: '2',
    name: 'b'
  }
]

router.post('/', (req, res) => {
  res.json({"id": "3", "name": req.body.name})
})

router.get('/', (req, res) => res.json(products))

router.get('/:id', (req, res) => {
  const selectedProduct = products.find(item => item.id === req.params.id)
  
  selectedProduct ? res.json(selectedProduct) : res.json({"msg": "ID dont exist"})
})

module.exports = router