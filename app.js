const http = require('http');
const server = http.createServer((req,res)=>{
    console.log(req.url , req.method , req.headers);


    res.headers('Content-Type', "text/html")
    res.write("hi this is test")
    res.end()
}).listen(3000)