const { Router } = require("express");
const allRoutes = Router();

const views = "../app/views/"

allRoutes.get("/", (req, res) => res.render(`${views}index.ejs`));
 
module.exports = allRoutes;