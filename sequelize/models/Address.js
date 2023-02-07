const { DataTypes } = require('sequelize')
const conn = require('../db/conn')
const User = require('./User')

const Address = conn.define('address', {
  street: {
    type: DataTypes.STRING,
    required: true
  },
  number: {
    type: DataTypes.STRING,
    required: true
  },
  city: {
    type: DataTypes.STRING,
    required: true
  }
})

// fazendo as relações das duas tabelas
User.hasMany(Address)
Address.belongsTo(User)

module.exports = Address