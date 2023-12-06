// Import required core modules
const path = require("path");
const routeDir = require("./util/path.js");
const express = require("express");

const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const app = express();

app.engine('hbs', expressHbs({
  layoutsDir:'views/layouts', defaultLayout:'main-layout'
}))
app.set("view engine", "hbs");
app.set("views", "views");
const AdminRouter = require("./routes/admin.js");
const ShopRouter = require("./routes/shop.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(routeDir, "public")));
app.use("/admin", AdminRouter.router);

app.use(ShopRouter);

app.use((req, res, next) => {
	res.status(404).render("404", { pageTitle: "pages 404" });
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
