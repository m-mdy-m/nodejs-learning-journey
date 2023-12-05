const http = require("http");
const router = require("./routes.js")
const server = http.createServer(router)
server.listen(80, () => {
  console.log("run server port 80");
});
