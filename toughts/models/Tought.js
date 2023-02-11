const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const User = require('./User')

const Tought = db.define('tought', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  }
})

// as relações devem ser feitas na tabela secundária
Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought