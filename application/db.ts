const { Pool } = require('pg')
require ('dotenv').config()


const connectionPool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
})

console.log(process.env.POSTGRES_URL)

module.exports = connectionPool