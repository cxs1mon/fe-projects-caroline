const { Router } = require("express");
const angebotRouter = Router();
const {
  gruppenEinzelnterricht,
  anmeldung,
  voltegieren,
  voltegierPreise,
  gruppeEinzelPreise,
} = require("../../config/config.js");

angebotRouter.get("/angebot", async (req, res) => {
  res.render("angebot-content", {
    gruppenEinzelnterricht,
    anmeldung,
    voltegieren,
    voltegierPreise,
    gruppeEinzelPreise,
    title: "Angebot",
  });
});

module.exports = angebotRouter;
