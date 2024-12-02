const { Router } = require("express");
const allRoutes = Router();

allRoutes.get("/(index)?(.html)?", (req, res) => res.render('index'));

allRoutes.get("/angebot(.html)?", (req, res) => res.render('angebot'));

allRoutes.get("/meine-pferde(.html)?", (req, res) => res.render('meine-pferde'));

allRoutes.get("/kontakt(.html)?", (req, res) => res.render('kontakt'));

allRoutes.get("/ueber-mich(.html)?", (req, res) => res.render('ueber-mich'));

module.exports = allRoutes;