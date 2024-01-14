const express =require('express')
const bodyParser = require('body-parser')
const app = express()
const feedRoute = require('./routes/feed')
const mongoose = require('mongoose')
// app.use(bodyParser.urlencoded()) // x-www-form-url => <form> -> درواقع این برای فرم هاست و ما فرمی نداریم برای restApi
app.use(bodyParser.json()) /// application/json 

app.use((req,res,nxt)=>{
    res.setHeader("Access-Control-Allow-Origin", '*') // یعنی هرکسی از هرسایتی میتون به محتوای ما دسترسی داشته باشد
    res.setHeader("Access-Control-Allow-Methods",'OPTIONS,GET,POST,PUT,PATCH,DELETE') // میتونند با این متد ها استفاده کنند
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type, Authorization') 
    nxt()
})

app.use(feedRoute)
const start = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/testRestAPi')
        console.log('connect database')
        app.listen(3000, ()=>{
            console.log('run server on port 3000')
        })
    }catch(er){
        console.log(er)
    }
}
start()