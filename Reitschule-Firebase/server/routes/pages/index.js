const { Router } = require("express");
const indexRouter = Router();
const { index_hero } = require('../../../client/public/js/components/hero-component');

indexRouter.get("/", async (req, res) => {
  res.render("index-content", { index_hero, title: "Willkommen" });
});

module.exports = indexRouter;
