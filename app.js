const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader("Content-Type", "text/html");

  if (url === "/") {
    res.write("hi this is test for url => /");
    res.write(`
    <form action="/message" method="POST">
    <input type="text" placeholder="type name">
    <button type="submit">Send</button>
    </form>`)
    res.end();
  } else if (url === "/test") {
    res.write("hi this is test for url => /test");
    res.end();
  } else if (url === "/message" && method === "POST") { 
    const body = []
    req.on("data",(chunk)=>{
        console.log(chunk);
        body.pus(chunk)
    })
    req.on("end",()=>{
        const parseBody = Buffer.concat(body).toString()
        console.log(parseBody);
    })
    fs.writeFile("msg.txt", "hi", (err) => { 
      if (err) {
        console.error(err);
        res.statusCode = 500; 
        res.end();
        return;
      }
      res.statusCode = 302; 
      res.setHeader("Location", "/"); 
      res.end();
    });
  } else {
    res.write("hi this is test");
    res.end();
  }
});

server.listen(3000, () => {
  console.log('server on 3000');
});