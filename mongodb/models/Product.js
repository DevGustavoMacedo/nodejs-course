const mongoose = require('mongoose')
const { Schema } = mongoose

const Product = mongoose.model(
  'products',
  new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
  })
)

module.exports = Product