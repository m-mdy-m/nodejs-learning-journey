const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const AdminRouter = require("./routes/admin.js")
const ShopRouter = require("./routes/shop.js")

app.use(bodyParser.urlencoded({extended :false}));
app.use("/admin",AdminRouter)
app.use(ShopRouter)

app.use((req,res,next)=>{
  res.status(404).send("<h1 style=color:red;>Page Not Found 404</h1>")
})
app.listen(3000, () => {
  console.log("Server running on port 3000");
});