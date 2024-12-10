const { Router } = require("express");
const angebotRouter = Router();

angebotRouter.get("/angebot", (req, res) => res.render('angebot'));

module.exports = angebotRouter;