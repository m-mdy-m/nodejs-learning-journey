const http = require("http");
const fs = require('fs')
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  const url = req.url;
  const method = req.method
  res.setHeader("Content-Type", "text/html"); 

  if (url === "/") {
    res.write("hi this is test for url => /");
    res.end();
  } else if (url === "/test") {
    res.write("hi this is test for url => /test");
    res.end();

  } else if (url=== "/message" && method === 'POST'){

  } else {
    res.write("hi this is test");
    res.end();
  }
});

server.listen(3000, () => {
  console.log('server on 3000 ');
});