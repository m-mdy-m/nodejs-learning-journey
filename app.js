const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write(`
    <form action="/msg" method="POST">
        <input type="text" name="message" placeholder="type text">
        <button type="submit">Send</button>
    </form>
`);
    return res.end();
  } else if (url === "/msg" && method === "POST") {
    const text = [];
    req.on("data", (chunk) => {
      text.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(text).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("text.txt", message, (err) => {
        if (err) {
          res.statusCode = 500;
          return res.end("Error writing to file");
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  }
});
server.listen(80, () => {
  console.log("run server port 80");
});
