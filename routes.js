const fs = require("fs");
const reqHand = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const url = req.url;
  const method = req.method;
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
      const message = parsedBody.split("=")[0];
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
};
// module.exports = {
//   handlre: reqHand,
//   someText: "HI",
// };

module.exports.handlre = reqHand;
module.exports.someText = "hi my name is mahdi";
