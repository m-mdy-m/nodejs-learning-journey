// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-complete',
//     password:'mdy_mmshly13831922'
// })
// module.exports = pool.promise()
// =======================
// Sequelize
// =======================

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("node-complete", "root", "mdy_mmshly13831922", {
// 	dialect: "mysql",
//     host: "localhost"
// });
// module.exports = sequelize



// module.exports = connect

// No SQl
const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017'
let db;
const connect = async ()=>{
    const client = await MongoClient.connect(url, { useUnifiedTopology: true })
    db = client.db()
    return client
}


const getDb = ()=>{
    if (db) {
        return db
    }
    throw 'no database found'
}
exports.connect  = connect
exports.getDb = getDb