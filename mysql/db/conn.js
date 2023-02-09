const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const conn = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
})

module.exports = conn