const { Router } = require("express");
const indexRouter = Router();
//nur daten vom config laden, nicht die ganze komponente
const { index_hero } = require('../../config/config.js');

indexRouter.get("/(index)?", async (req, res) => {
  res.render("index-content", { index_hero, title: "Willkommen" });
});

module.exports = indexRouter;
