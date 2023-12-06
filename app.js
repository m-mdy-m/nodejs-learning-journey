// Import required core modules
const path = require("path");
const routeDir = require("./util/path.js");
const express = require("express");

const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "pug");
app.set("views", "views");
const AdminRouter = require("./routes/admin.js");
const ShopRouter = require("./routes/shop.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(routeDir, "public")));
app.use("/admin", AdminRouter.router);

app.use(ShopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(routeDir, "views", "404.html"));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
