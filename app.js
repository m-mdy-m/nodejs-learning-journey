const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const AdminRouter = require("./routes/admin.js")
const ShopRouter = require("./routes/shop.js")

app.use(bodyParser.urlencoded({extended :false}));
app.use(AdminRouter)

app.use(ShopRouter)
app.listen(3000, () => {
  console.log("Server running on port 3000");
});