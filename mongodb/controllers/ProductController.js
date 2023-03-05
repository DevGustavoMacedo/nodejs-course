const Product = require('../models/Product')

const showAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    return res.status(201).json(products)
  } catch (error) {
    console.log(error)
    return res.status(404)
  }
}

const showOneProduct = async (req, res) => {
  const id = req.params.id

  try {
    const product = await Product.findById(id)
    return res.status(201).json(product)
  } catch (error) {
    console.log(error)
    return res.status(404)
  }
}

const createProduct = async (req, res) => {
  const { name, price } = req.body

  const product = { name, price }

  try {
    await Product.create(product)
  } catch (error) {
    console.log(error)
    return res.status(404)
  }
  
  return res.status(201).json({ success: 'Product added' })
}

const deleteProduct = async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)

  try {
    await product.deleteOne({ _id: id })
  } catch (error) {
    console.log(error)
    return res.status(404)
  }

  return res.status(201).json({ success: 'Product deleted' })
}

const updateProduct = async (req, res) => {
  const id = req.params.id
  const { name, price } = req.body

  const product = { name, price }

  try {
    await Product.updateOne({ _id: id }, product)
  } catch (error) {
    console.log(error)
    return res.status(404)
  }

  return res.status(201).json({ success: 'Product updated' })
}

module.exports = {
  showAllProducts,
  showOneProduct,
  createProduct,
  deleteProduct,
  updateProduct,
}
