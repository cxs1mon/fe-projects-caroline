const { Router } = require("express");
const allRoutes = Router();

allRoutes.get("/", (req, res) => res.render('index')); // No need for extension or relative path

module.exports = allRoutes;