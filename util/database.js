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




// No SQl
const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017'

const connect = async ()=>{
    try{
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });

        console.log('connect dataBase');
        return client;
    }catch(e){
        console.log('err connect database =>',e );
    }
}
connect()
module.exports = connect