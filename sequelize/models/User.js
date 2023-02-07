const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = db.define('user', {
  name: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false
  },
  occupation: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false
  },
  newsletter: {
    type: DataTypes.BOOLEAN
  }
})

module.exports = User