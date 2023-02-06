const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(
  process.env.DBDATABASE,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: 'mysql'
  }
)

try {
  sequelize.authenticate()
  console.log('Database connected')
} catch (error) {
  console.log(error)
}

module.exports = sequelize