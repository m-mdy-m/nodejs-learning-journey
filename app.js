const http = require("http");
const express = require("express")
const app = express()
// const router = require("./routes.js")
// console.log(router.someText);
// const server = http.createServer(router.handlre )
const server = http.createServer(app)
server.listen(80, () => {
  console.log("run server port 80");
});
