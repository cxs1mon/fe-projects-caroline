const { Router } = require("express");
const ueberMichRouter = Router();
const {vorstellung, reiterfahrung, pferdehaltung} = require('../../config.js');

ueberMichRouter.get("/ueber-mich", (req, res) => res.render('ueber-mich', { vorstellung, reiterfahrung, pferdehaltung}));

module.exports = ueberMichRouter;