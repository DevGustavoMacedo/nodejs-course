const mongoose = require('mongoose')

const dotenv = require('dotenv').config()

const dbName = process.env.DB_DATABASE
const dbPort = process.env.DB_PORT
const dbHost = process.env.DB_HOST
const dbDialect = process.env.DB_DIALECT

mongoose.set('strictQuery', true)

const main = async () => await mongoose.connect(`${dbDialect}://${dbHost}:${dbPort}/${dbName}`)

main()
  .then(() => console.log('Database connected'))
  .catch((error) => console.log(error))

module.exports = main
