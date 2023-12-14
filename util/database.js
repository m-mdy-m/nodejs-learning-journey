const mysql = require('mysql2')


const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-complete',
    password:'mdy_mmshly13831922'
})
module.exports = pool.promise()