const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
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
  } else if (url === "/message" && method === "POST") { // Only allow POST requests to this path.
    fs.writeFile("msg.txt", "hi", (err) => { // Asynchronously write file.
      if (err) {
        console.error(err);
        res.statusCode = 500; // Internal Server Error
        res.end();
        return;
      }
      res.statusCode = 302; // Set status code to 'Found' (commonly used for redirection).
      res.setHeader("Location", "/"); // Redirect to root.
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