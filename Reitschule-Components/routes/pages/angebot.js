const { Router } = require("express");
const angebotRouter = Router();
const { gruppenEinzelnterricht, anmeldung, voltegieren, voltegierPreise, gruppeEinzelPreise } = require('../../config.js');


angebotRouter.get("/angebot", (req, res) => res.render('angebot', {gruppenEinzelnterricht, anmeldung, voltegieren, voltegierPreise, gruppeEinzelPreise}));

module.exports = angebotRouter;