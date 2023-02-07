const { Sequelize } = require('sequelize')
const dotenv = require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DBDATABASE,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: 'mysql'
  }
)

module.exports = sequelize