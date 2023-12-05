const http = require("http");
const router = require("./routes.js")
console.log(router.someText);
const server = http.createServer(router.handlre )

server.listen(80, () => {
  console.log("run server port 80");
});
