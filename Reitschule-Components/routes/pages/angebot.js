const { Router } = require("express");
const angebotRouter = Router();
const { gruppenEinzelnterricht, anmeldung, voltegieren } = require('../../config.js');


angebotRouter.get("/angebot", (req, res) => res.render('angebot', {gruppenEinzelnterricht, anmeldung, voltegieren}));

module.exports = angebotRouter;