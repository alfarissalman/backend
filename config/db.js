const { Pool } = require('pg')
const db = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'db_nutech',
    user: 'postgres',
    password: '123'
})

db.connect((err) => {
    if (err) return console.log(err.message)
    console.log('database berhasil connect')
})

module.exports = db