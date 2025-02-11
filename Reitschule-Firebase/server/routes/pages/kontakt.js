const { Router } = require("express");
const kontaktRouter = Router();
const { adressen, lage, kontaktformular } = require("../../config/config.js");

kontaktRouter.get("/kontakt", async (req, res) => {
  res.render("kontakt-content", {
    adressen,
    lage,
    kontaktformular,
    title: "Kontakt",
  });
});

module.exports = kontaktRouter;
