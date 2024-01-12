const express =require('express')
const app = express()
const feedRoute = require('./routes/feed')
app.use(feedRoute)
app.listen(3000, ()=>{
    console.log('run server on port 3000')
})