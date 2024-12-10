const { Router } = require("express");
const kontaktRouter = Router();

kontaktRouter.get("/kontakt", (req, res) => res.render('kontakt'));

module.exports = kontaktRouter;