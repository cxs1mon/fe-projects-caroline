const { Router } = require("express");
const indexRouter = Router();
const { index_hero } = require("../../config.js");

indexRouter.get("/", async (req, res) => {
  res.render("index-content", { index_hero, title: "Willkommen" });
});

module.exports = indexRouter;
