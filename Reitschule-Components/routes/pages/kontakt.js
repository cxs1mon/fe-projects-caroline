const { Router } = require("express");
const kontaktRouter = Router();
const { adressen, lage, kontaktformular} = require('../../config.js');

kontaktRouter.get("/kontakt", (req, res) => res.render('kontakt', {adressen, lage, kontaktformular}));

module.exports = kontaktRouter;