const http = require("http");
const { url } = require("inspector");
const server = http.createServer((req,res)=>{
    res.headers('Content-Type', "text/html")
    console.log(req.url , req.method , req.headers);
    if (url === "/") {
        res.write("hi this is test for url => /")
        res.end()
    }else if (url === '/test'){
        res.write("hi this is tes fot url => /test")
        res.end()
    }else{
        res.write("hi this is test")
        res.end()
    }

})
server.listen(3000)