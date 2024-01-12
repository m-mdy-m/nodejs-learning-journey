const express =require('express')
const bodyParser = require('body-parser')
const app = express()
const feedRoute = require('./routes/feed')
// app.use(bodyParser.urlencoded()) // x-www-form-url => <form> -> درواقع این برای فرم هاست و ما فرمی نداریم برای restApi
app.use(bodyParser.json()) /// application/json 
app.use(feedRoute)
app.listen(3000, ()=>{
    console.log('run server on port 3000')
})